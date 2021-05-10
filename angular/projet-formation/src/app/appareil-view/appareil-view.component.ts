import {Component, OnInit} from '@angular/core';
import {AppareilService} from '../services/appareil.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  /* property bidding */
  isAuth = false;
  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      resolve(date);
      // setTimeout(
      //   () => {
      //     resolve(date);
      //   }, 2000
      // );
    }
  );

  /* methode executée au moment de la creation de ce composant */
  constructor(private appareilService: AppareilService) {
    setTimeout(
      /* fonction anonyme ou arrow function */
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  /* cette fonction sera executée au moment de la création du component par angular et après l'execution du constructeur */

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();

    console.log(this.appareils);
  }

  onTurnOn() {
    this.appareilService.switchOnAll();
  }

  onSwitchOff() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

}
