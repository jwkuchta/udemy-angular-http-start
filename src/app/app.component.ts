import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';

const postsUrl = 'https://udemy-httpee.firebaseio.com/posts.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = []
  isFetching = false

  // inject HttpClient in order to be able to use it
  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true
    // we define the http request in the post service, but we send it here
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts)
    this.isFetching = false
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePosts(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts)
    this.isFetching = false
  }

  onClearPosts() {
    // Send Http request
  }
}
