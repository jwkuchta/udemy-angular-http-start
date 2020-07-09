import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

const postsUrl = 'https://udemy-httpee.firebaseio.com/posts.json'

@Injectable({providedIn: 'root'})
export class PostService {
    // we will move the http requests here and only display responses in the front end
    // if we have multiple places in the app that need to know about errors, it's better to do the following:
    error = new Subject<string>()

    constructor(private http: HttpClient) {}

    createAndStorePosts(title: string, content: string) {
        const postData: Post = {title, content}
        this.http // http from line 15
      // endpoint, body. Angular converts postData into JSON data
      .post(postsUrl, postData)
      // if you are not subscribing tot the http request, the request will not be sent
      .subscribe(
          responseData => console.log(responseData),
          error => this.error.next(error)
      )
    }

    fetchPosts() {
        // instead of sending the request here, we will return it, and subscribe to it in the app component
        return this.http
        .get<{[key: string]: Post}>(
            postsUrl, 
            { 
                headers: new HttpHeaders({ 'Custom-Headers': 'Hello' })
            }) // we can define the type of the response in the get method or in the map func
        .pipe(map(responseData => {
            const postsArray: Post[] = []
            for (let key in responseData) {
                // spread operator to include nested objects
                if (key in responseData) {
                    postsArray.push({...responseData[key], id: key})
                } 
            }
            return postsArray
        }),
        catchError(error => throwError(error))
        )
    }

    deletePosts() {
        return this.http.delete(postsUrl)
    }
}