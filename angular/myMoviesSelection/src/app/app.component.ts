import {Component} from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'myMoviesSelection';

  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyB1QpLP1vfeTn3ddNsJrUMCJFeLO05-O4w',
      authDomain: 'mymovieselection.firebaseapp.com',
      databaseURL: 'https://mymovieselection.firebaseio.com',
      projectId: 'mymovieselection',
      storageBucket: 'mymovieselection.appspot.com',
      messagingSenderId: '795072144841',
      appId: '1:795072144841:web:c8d09cb1a8c3db4ed37418'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
