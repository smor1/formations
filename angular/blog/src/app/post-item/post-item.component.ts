import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/Post.model';

@Component({
  selector: 'app-post-item-component',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {


  @Input() title: string;
  @Input() content: string;
  @Input() date: Date;
  @Input() loveIts: number;
  @Input() post: Post;


  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
  }

  postLove() {
    this.loveIts++;
  }

  postDontLove() {

    if (this.loveIts >= 1) {
      this.loveIts--;
    }
  }

  deletePost(post: Post) {
    this.postService.deletePost(post);
  }
}
