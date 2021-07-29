import { Injectable } from '@angular/core';
import { Video } from '../student';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private videos: Video[] = [];
  private PostsUpdated = new Subject<Video[]>();

  constructor(private http: HttpClient) { }


  AddPost(name: string, Introduction: string, video: File) {
    const postData = new FormData();
    postData.append('name', name);
    postData.append('Introduction', Introduction);
    postData.append('video', video);
    this.http.post<{message: string, video: Video}>('http://localhost:3000/video/addvideo', postData).
    subscribe(responseData => {
      console.log(responseData.message);
      // tslint:disable-next-line: no-shadowed-variable
      const video: Video = {
        id: responseData.video.id,
        // tslint:disable-next-line: object-literal-shorthand
        name: name, Introduction: Introduction, imagePath: responseData.video.imagePath};
      this.videos.push(video);
      this.PostsUpdated.next([...this.videos]);
    });
  }


  GetPosts() {
    this.http.get<{message: string, posts: any }>('http://localhost:3000/video/getvideos')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          name: post.name,
          Introduction: post.Introduction,
          id: post._id,
          imagePath: post.imagePath,
        };
      });
    }))
    .subscribe(TransformedPosts => {
      this.videos = TransformedPosts;
      this.PostsUpdated.next([...this.videos]);
    });
  }
  GetPostsUpdatedListener() {
    return this.PostsUpdated.asObservable();
  }

  DeletePost(postId: string) {
    this.http.delete('http://localhost:3000/lecture/deletepost/' + postId)
    .subscribe(() => {
      // tslint:disable-next-line: triple-equals
      const updatedposts = this.videos.filter(post => post.id !== postId);
      this.videos = updatedposts;
      this.PostsUpdated.next([...this.videos]);
    });
    console.log('Post has been deleted!');
  }




  // AddNews(body: NewsModel): Observable <NewsModel[]> {
  //   return this.http.post<NewsModel[]>('http://localhost:3000/lecture/addnews', body);
  // }

  // GetVids(): Observable <Video[]> {
  //   return this.http.get<Video[]>('http://localhost:3000/video/getvideos');
  // }

  GetOneVideo(id: string): Observable <Video[]> {
    return this.http.get<Video[]>('http://localhost:3000/lecture/newsone/' + id);
  }

  // getpics() {
  //   return this.http.get('http://localhost:3000/lecture/getpics');
  // }
}
