import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MoviesService} from '../../services/movies.service';
import {Router} from '@angular/router';
import {Movie} from '../../models/Movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movieForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private moviesService: MoviesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      actors: this.formBuilder.array([]),
      abstract: ''
    });
  }

  onSaveMovie() {
    const title = this.movieForm.get('title').value;
    const director = this.movieForm.get('director').value;
    const abstract = this.movieForm.get('abstract').value;
    const actors = this.movieForm.get('actors').value ? this.movieForm.get('actors').value : [];
    const newMovie = new Movie(title, director, actors);
    newMovie.abstract = abstract;
    this.moviesService.createNewMovie(newMovie);
    this.router.navigate(['/movies']);
  }

  getActors() {
    return this.movieForm.get('actors') as FormArray;
  }

  onAddMovie() {
    const newActorControl = this.formBuilder.control(null, Validators.required);
    this.getActors().push(newActorControl);
  }
}
