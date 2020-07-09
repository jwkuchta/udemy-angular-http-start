import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

const postsUrl = 'https://udemy-httpee.firebaseio.com/posts.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = []
  isFetching = false
  error = null
  errorSub: Subscription

  // inject HttpClient in order to be able to use it
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(error => this.error = error)
    this.isFetching = true
    // we define the http request in the post service, but we send it here
    this.postService.fetchPosts().subscribe(
      posts => this.loadedPosts = posts,
      error => this.error = error
      )
    this.isFetching = false
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true
    this.postService.fetchPosts().subscribe(
      posts => this.loadedPosts = posts, 
      error => this.error = error)
    this.isFetching = false
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(resp => console.log('posts deleted successfully'))
  }

  onHandleError() {
    this.error = null
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

}
