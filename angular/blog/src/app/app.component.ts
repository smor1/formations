import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from './models/Post.model';
import {Subscription} from 'rxjs';
import {PostService} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  constructor() {
  }
}
