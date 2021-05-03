<?php

namespace Drupal\config_overview\Controller;

use Drupal\Component\Serialization\Json;
use Drupal\config_override_warn\FormOverrides;
use Drupal\Core\Config\Config;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Site\Settings;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Config\ConfigManagerInterface;

/**
 * Provides a config overview admin page.
 */
class ConfigOverviewController extends ControllerBase {

  /**
   * The config manager service.
   *
   * @var \Drupal\Core\Config\ConfigManagerInterface
   */
  protected $configManager;

  /**
   * The module handler service.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The form overrides service.
   *
   * @var \Drupal\config_override_warn\FormOverrides
   */
  protected $formOverrides;

  /**
   * Constructs a ConfigOverviewController object.
   *
   * @param \Drupal\Core\Config\ConfigManagerInterface $config_manager
   *   The config manager service.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler service.
   * @param \Drupal\config_override_warn\FormOverrides $form_overrides
   *   The form overrides service.
   */
  public function __construct(ConfigManagerInterface $config_manager,
                              ModuleHandlerInterface $module_handler,
                              FormOverrides $form_overrides) {
    $this->configManager = $config_manager;
    $this->moduleHandler = $module_handler;
    $this->formOverrides = $form_overrides;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.manager'),
      $container->get('module_handler'),
      $container->get('config_override_warn.form_overrides')
    );
  }

  /**
   * Display a config overview.
   *
   * @return array
   *   A renderable array.
   */
  public function content() {
    $display_protected_column_description = FALSE;
    $excludedModules = Settings::get('config_exclude_modules');
    $allConfigs = $this->configManager->getConfigFactory()->listAll();
    $configs = $this->configManager->getConfigFactory()->loadMultiple($allConfigs);
    $modulePath = $this->moduleHandler->getModule('config_overview')->getPath();
    $header = [
      $this->t('Config name'),
      $this->t('Overridden'),
      $this->t('Overrides'),
      $this->t('Synchronized'),
    ];
    $dependencies = [];
    if ($this->moduleHandler->moduleExists('config_split')) {
      $display_protected_column_description = TRUE;
      $header[] = $this->t('Protected on import');
      $splits = $this->configManager->findConfigEntityDependentsAsEntities('module', ['config_split']);
      foreach ($splits as $split) {
        $dependencies[] = $split->get('graylist');
      }
    }
    $rows = [];
    foreach ($configs as $config) {
      $is_config_excluded = $this->isConfigExcluded($config, $excludedModules);
      $overrides = $this->formOverrides->getConfigOverrideDiffs($config->getName());
      if (isset($overrides[$config->getName()]) && count($overrides[$config->getName()]) != 0) {
        $overrideRows = [
          '#type' => 'link',
          '#title' => $this->t('View overrides'),
          '#url' => Url::fromRoute('config_overview.overrides', ['config_name' => $config->getName()], ['query' => $this->getDestinationArray()]),
          '#options' => [
            'attributes' => [
              'class' => ['use-ajax'],
              'data-dialog-type' => 'modal',
              'data-dialog-options' => Json::encode(['width' => 700]),
            ]
          ],
          '#attached' => ['library' => ['core/drupal.dialog.ajax']],
        ];
      }
      else {
        $overrideRows = NULL;
      }
      if (count($this->formOverrides->getConfigOverrides($config)) != 0) {
        $imageUri = $modulePath . '/images/yes.png';
      }
      else {
        $imageUri = $modulePath . '/images/no.png';
      }
      $overriddenImage = [
        '#theme' => 'image',
        '#width' => '16',
        '#uri' => $imageUri,
        '#alt' => 'overridden image',
        '#title' => 'overridden image',
      ];
      if ($is_config_excluded) {
        $imageUri = $modulePath . '/images/yes.png';
      }
      else {
        $imageUri = $modulePath . '/images/no.png';
      }
      $excludedImage = [
        '#theme' => 'image',
        '#width' => '16',
        '#uri' => $imageUri,
        '#alt' => 'exclude image',
        '#title' => 'exclude image',
      ];
      if (strpos(json_encode($dependencies), $config->getName()) > 0) {
        $imageUri = $modulePath . '/images/yes.png';
      }
      else {
        $imageUri = $modulePath . '/images/no.png';
      }
      $protectedOnImportImage = [
        '#theme' => 'image',
        '#width' => '16',
        '#uri' => $imageUri,
        '#alt' => 'protected on import image',
        '#title' => 'protected on import image',
      ];
      $row = [
        $config->getName() . ' (' . $config->get('langcode') . ')',
        render($overriddenImage),
        render($overrideRows),
        render($excludedImage),
      ];
      if ($this->moduleHandler->moduleExists('config_split')) {
        $row[] = render($protectedOnImportImage);
      }
      $rows[] = $row;
    }
    $table = [
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $rows,
    ];
    $intro = [
      '#theme' => 'config_overview',
      '#img_no' => base_path() . $modulePath . '/images/no.png',
      '#img_yes' => base_path() . $modulePath . '/images/yes.png',
      '#display_protected_column_description' => $display_protected_column_description,
    ];

    return [
      'intro' => $intro,
      'table' => $table,
      '#cache' => ['max-age' => 0],
    ];
  }

  /**
   * Determines if a config is excluded from configurations synchronization.
   *
   * @param \Drupal\Core\Config\Config $config
   *   The config object.
   * @param array $excluded_modules
   *   An array of excluded modules.
   *
   * @return bool
   *   A boolean.
   */
  public function isConfigExcluded(Config $config, array $excluded_modules = NULL) {
    if ($excluded_modules == NULL) {
      return FALSE;
    }
    // Is there any dependencies to any excluded module?
    if (is_array($config->get('dependencies.module'))
      && count(array_intersect($excluded_modules, $config->get('dependencies.module')))) {
      return TRUE;
    }
    if (is_array($config->get('dependencies.enforced.module'))
      && count(array_intersect($excluded_modules, $config->get('dependencies.enforced.module')))) {
      return TRUE;
    }
    foreach ($excluded_modules as $moduleName) {
      if (preg_match("#" . $moduleName . "#", $config->getName())) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * Display a table of config properties overrides.
   *
   * @param string $config_name
   *   The config name.
   *
   * @return array
   *   A renderable array.
   */
  public function overrides($config_name = NULL) {
    $overrides = $this->formOverrides->getConfigOverrideDiffs($config_name);
    foreach ($overrides as $override) {
      $override_rows = [];
      foreach ($override as $item => $value) {
        $override_rows[] = [
          $item,
          $value['original'],
          $value['override'],
        ];
      }
      return [
        '#type' => 'table',
        '#title' => $this->t('Overrides for the %name configuration', ['%name' => $config_name]),
        '#header' => [
          $this->t('Property name'),
          $this->t('Original value'),
          $this->t('Overridden value'),
        ],
        '#rows' => $override_rows,
      ];
    }
  }

}
