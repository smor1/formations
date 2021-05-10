import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Movie} from '../../models/Movie.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  movie: Movie;

  constructor(private movieService: MoviesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // this.movie = new Movie('', '', []);
    const id = this.route.snapshot.params.id;
    this.movieService.getSingleMovie(+id).then(
      (movie: Movie) => {
        this.movie = movie;
        console.log(this.movie);
      }
    );
  }

  onBack() {
    this.router.navigate(['/movies']);
  }


}
