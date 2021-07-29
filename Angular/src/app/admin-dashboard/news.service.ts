import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsModel, Post } from './student';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // private news: NewsModel[] = [];

  private posts: Post[] = [];
  private PostsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  // AddPost(postHeading: string, postContent: string) {
  //   // tslint:disable-next-line: object-literal-shorthand
  //   const post: Post = {id: null, postHeading: postHeading, postContent: postContent};
  //   this.http.post<{message: string}>('http://localhost:3000/lecture/addpost', post).
  //   subscribe(responseData => {
  //     console.log(responseData.message);
  //   });
  //   this.posts.push(post);
  //   this.PostsUpdated.next([...this.posts]);
  // }

  AddPost(postHeading: string, postContent: string, image: File) {
    const postData = new FormData();
    postData.append('postHeading', postHeading);
    postData.append('postContent', postContent);
    postData.append('image', image);
    this.http.post<{message: string, post: Post}>('http://localhost:3000/lecture/addpost', postData).
    subscribe(responseData => {
      console.log(responseData.message);
      const post: Post = {
        id: responseData.post.id,
        // tslint:disable-next-line: object-literal-shorthand
        postHeading: postHeading, postContent: postContent, imagePath: responseData.post.imagePath};
      this.posts.push(post);
      this.PostsUpdated.next([...this.posts]);
    });
  }


  GetPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/lecture/getposts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          postHeading: post.postHeading,
          postContent: post.postContent,
          id: post._id,
          imagePath: post.imagePath,
        };
      });
    }))
    .subscribe(TransformedPosts => {
      this.posts = TransformedPosts;
      this.PostsUpdated.next([...this.posts]);
    });
  }
  GetPostsUpdatedListener() {
    return this.PostsUpdated.asObservable();
  }

  DeletePost(postId: string) {
    this.http.delete('http://localhost:3000/lecture/deletepost/' + postId)
    .subscribe(() => {
      // tslint:disable-next-line: triple-equals
      const updatedposts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedposts;
      this.PostsUpdated.next([...this.posts]);
    });
    console.log('Post has been deleted!');
  }




  // AddNews(body: NewsModel): Observable <NewsModel[]> {
  //   return this.http.post<NewsModel[]>('http://localhost:3000/lecture/addnews', body);
  // }

  // GetNews(): Observable <NewsModel[]> {
  //   return this.http.get<NewsModel[]>('http://localhost:3000/lecture/getnews');
  // }

  GetOneNews(id: string): Observable <Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/lecture/newsone/' + id);
  }

  // getpics() {
  //   return this.http.get('http://localhost:3000/lecture/getpics');
  // }
}
