import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Post } from './post.model';

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
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isFetching = true
    this.fetchPosts()
    this.isFetching = false
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http // http from line 15
      // endpoint, body. Angular converts postData into JSON data
      .post(postsUrl, postData)
      // if you are not subscribing tot the http request, the request will not be sent
      .subscribe(responseData => console.log(responseData)
      )
      this.isFetching = false
  }

  onFetchPosts() {
    this.isFetching = true
    this.fetchPosts() 
    this.isFetching = false
  }

  private fetchPosts() {
    this.http
    .get<{[key: string]: Post}>(postsUrl) // we can define the type of the response in the get method or in the map func
    .pipe(map(responseData => {
      const postsArray: Post[] = []
      for (let key in responseData) {
        // spread operator to include nested objects
        if (key in responseData) {
          postsArray.push({...responseData[key], id: key})
        } 
      }
      return postsArray
    }))
    .subscribe(posts => this.loadedPosts = posts)
  }

  onClearPosts() {
    // Send Http request
  }
}
