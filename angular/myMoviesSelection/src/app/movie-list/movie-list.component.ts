import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../models/Movie.model';
import {Subscription} from 'rxjs';
import {MoviesService} from '../services/movies.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  movies: Movie[];
  moviesSubscription: Subscription;

  constructor(private movieService: MoviesService,
              private router: Router) {
  }

  ngOnInit(): void {
    // récuperer la liste des films
    this.moviesSubscription = this.movieService.moviesSubject.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.movieService.getMovies();
    this.movieService.emitMovies();
  }

  onNewMovie() {
    this.router.navigate(['/movie', 'new']);
  }

  onDeleteMovie(movie: Movie) {
    this.movieService.removeMovie(movie);
  }

  onViewMovie(id: number) {
    this.router.navigate(['/movie', 'view', id]);
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }

}
