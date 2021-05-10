import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {SingleMovieComponent} from './movie-list/single-movie/single-movie.component';
import {MovieFormComponent} from './movie-list/movie-form/movie-form.component';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './services/auth.service';
import {MoviesService} from './services/movies.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'movies', component: MovieListComponent},
  {path: 'movie/new', component: MovieFormComponent},
  {path: 'movie/view/:id', component: SingleMovieComponent},
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: '**', redirectTo: 'movies'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MovieListComponent,
    SingleMovieComponent,
    MovieFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    MoviesService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
