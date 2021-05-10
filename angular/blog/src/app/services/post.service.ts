import {Injectable} from '@angular/core';
import {Post} from '../models/Post.model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [
    {
      title: 'Mon premier post',
      content: 'ceci est mon premier post alors il va falloir etre indulgent concernant la l\'orthographe',
      loveIts: 0,
      createdAt: new Date()
    },
    {
      title: 'Mon deuxieme post',
      content: 'ceci est mon deuxieme post alors il va falloir etre indulgent concernant la l\'orthographe',
      loveIts: 0,
      createdAt: new Date()
    },
    {
      title: 'Mon troisieme poste',
      content: 'ceci est mon troisieme post alors il va falloir etre indulgent concernant la l\'orthographe',
      loveIts: 0,
      createdAt: new Date()
    },

  ];

  postSubject = new Subject<Post[]>();

  emitPosts() {
    //slice() method extracts a section of an array and returns a new array.
    this.postSubject.next(this.posts.slice());
  }

  deletePost(post: Post) {
    this.posts.splice(this.posts.findIndex(postObj => postObj === post), 1);
    this.emitPosts();
  }

  addNewPost(post: Post) {
    this.posts.push(post);
  }


}
