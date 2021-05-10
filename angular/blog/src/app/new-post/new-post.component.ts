import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Post} from '../models/Post.model';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const title = this.newPostForm.get('title').value;
    const content = this.newPostForm.get('content').value;
    const newPost = new Post(title, content, 0);
    this.postService.addNewPost(newPost);
  }

}
