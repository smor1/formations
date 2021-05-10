import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppareilService {

  appareilSubject = new Subject<any[]>();

  private appareils = [];

  // private appareils = [
  //   {
  //     id: 1,
  //     name: 'Machine à laver',
  //     status: 'allumé'
  //   },
  //   {
  //     id: 2,
  //     name: 'télevision',
  //     status: 'allumé'
  //   },
  //   {
  //     id: 3,
  //     name: 'Ordinateur',
  //     status: 'éteint'
  //   }
  // ];

  constructor(private httpCLient: HttpClient) {
  }

  emitAppareilSubject() {
    this.appareilSubject.next(this.appareils.slice());
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
    return appareil;
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(index: number) {

    this.appareils[index].status = 'allumé';
    console.log(this.appareils[index].name);
    this.emitAppareilSubject();
  }

  switchOffOne(index: number) {
    this.appareils[index].status = 'éteint';
    console.log(this.appareils[index].name);
    this.emitAppareilSubject();
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    // -1 car les élements de la liste sont numérotés à partir de 0
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }

  saveAppareilsToServer() {
    this.httpCLient
      .put('https://http-client-demo-5eb0c.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('enregistrement terminé! ');
        },
        error => {
          console.log('Erreur de sauvegarde !' + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpCLient
      .get<any[]>('https://http-client-demo-5eb0c.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        error => {
          console.log('Erreur de chargement !' + error);
        }
      );

  }
}
