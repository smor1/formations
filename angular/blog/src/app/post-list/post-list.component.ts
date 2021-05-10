import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/Post.model';
import {Subscription} from 'rxjs';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  postSubscription: Subscription;

  constructor(private postService: PostService) {

  }

  ngOnInit() {

    console.log('coucou');
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
