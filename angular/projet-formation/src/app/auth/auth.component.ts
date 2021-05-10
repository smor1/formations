import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AferView {

  authStatus: boolean;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  onSignIn() {
    // .then => reagir à la méthode asynchrone une fois que le callback sera appelé
    this.authService.signIn().then(
      () => {
        console.log('connexion reussie');
        this.authStatus = this.authService.isAuth;
        // naviguer vers une url une fois l'utilisateur connecté
        this.router.navigate(['appareils']);
      }
    );
  }

  onSignOut() {

    this.authService.signOut();
    console.log('deconnexion reussie', this.authService.isAuth);
    this.authStatus = this.authService.isAuth;
  }
}
