<?php

namespace Drupal\Tests\config_overview\Functional;

use Drupal\Core\Entity\EntityStorageException;
use Drupal\Tests\BrowserTestBase;

/**
 * Configuration Overview unit tests.
 *
 * @ingroup config_overview
 *
 * @group config_overview
 *
 * @coversDefaultClass \Drupal\config_overview\Controller\ConfigOverviewController
 */
class RoutingTest extends BrowserTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  protected static $modules = ['config_overview'];

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * The user.
   *
   * @var \Drupal\user\Entity\User|false
   */
  protected $user;

  /**
   * Test content() method.
   *
   * @covers ::content
   * @covers ::__construct
   * @throws \Behat\Mink\Exception\ExpectationException
   */
  public function testConfigOverviewPageAccess() {
    try {
      $this->user = $this->createUser(['access config overview']);
    } catch (EntityStorageException $e) {
    }
    $this->drupalLogin($this->user);
    $this->drupalGet('admin/config/config-overview');
    $this->assertSession()->statusCodeEquals(200);
    try {
      $this->user = $this->createUser([]);
    } catch (EntityStorageException $e) {
    }
    $this->drupalLogin($this->user);
    $this->drupalGet('admin/config/config-overview');
    $this->assertSession()->statusCodeEquals(403);
    $this->drupalGet('admin/config/config-overview/overrides/system.site');
    $this->assertSession()->statusCodeEquals(403);
  }

}
