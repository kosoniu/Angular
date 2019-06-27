import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from './post.model';
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({providedIn: "root"})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http
    .post<{name: string}>(
      'https://ng-complete-guide-a0ea4.firebaseio.com/posts.json',
      postData,
      {
        observe: "response"
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      this.error.next(error.message);
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-a0ea4.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({"Custom_header": "Hello"}),
        params: searchParams
      })
    .pipe(map((responseData) => {
      const postsArray: Post[] = [];
      for(let key in responseData) {
        if(responseData.hasOwnProperty(key)){
          postsArray.push({ ...responseData[key], id: key });
        }
      }

      return postsArray;
    }),
    catchError(error => {
      // send to analytics server
      return throwError(error);
    }));
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-a0ea4.firebaseio.com/posts.json',
    {
      observe: 'events'
    })
    .pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Sent) {
        // console
      }
      if(event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    }));
  }
}
