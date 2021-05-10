import {Injectable} from '@angular/core';
import {Movie} from '../models/Movie.model';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies: Movie[] = [];
  moviesSubject = new Subject<Movie[]>();

  constructor() {
  }

  emitMovies() {
    this.moviesSubject.next(this.movies);
  }

  saveMovies() {
    //.ref => reference à un node de la base de données
    //.set +> fonctionne comme le put
    firebase.database().ref('/movies').set(this.movies);
  }

  //.on => reagir à des modifications de la base de données
  getMovies() {
    firebase.database().ref('/movies')
      .on('value', (data) => {
        this.movies = data.val() ? data.val() : [];
        this.emitMovies();
      });
  }

  getSingleMovie(id: number) {
    // méthode asynchrone car pas besoin de recupérer les données en temps réel d'ou l'utilisation de once
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/movies/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewMovie(newMovie: Movie) {
    this.movies.push(newMovie);
    this.saveMovies();
    this.emitMovies();
  }

  removeMovie(movie: Movie) {
    const movieIndexToRemove = this.movies.findIndex(
      (movieElement) => {
        if (movieElement === movie) {
          return true;
        }
      }
    );
    // splice => pour supprimer le livre
    this.movies.splice(movieIndexToRemove, 1);
    this.saveMovies();
    this.emitMovies();
  }
}
