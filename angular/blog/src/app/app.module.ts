import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewPostComponent} from './new-post/new-post.component';
import {PostListComponent} from './post-list/post-list.component';
import {RouterModule, Routes} from '@angular/router';
import {PostItemComponent} from './post-item/post-item.component';
import {PostService} from './services/post.service';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: 'posts', component: PostListComponent},
  {path: 'new-post', component: NewPostComponent},
  {path: '', component: PostListComponent}
];

@NgModule({

  declarations: [
    AppComponent,
    PostItemComponent,
    NewPostComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
