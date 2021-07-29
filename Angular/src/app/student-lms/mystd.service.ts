import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Student, Pic } from '../admin-dashboard/student';
import { map } from 'rxjs/operators';
import { JwtTokenService } from '../client-interface/Client-Auth/jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class MystdService {
  student: Student[] = [];

  private pic: Pic[] = [];
  private PicUpdated = new Subject<Pic[]>();

  constructor(private http: HttpClient, private jwtservice: JwtTokenService) { }
// tslint:disable-next-line: variable-name
private _update = 'http://localhost:3000/users/com/';
  GetStds(): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appall');
  }
  GetStd(id: string): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appone/' + id);
  }
  UpdateUser(Fname: string, Lname: string, Gender: string, Phoneno: string,
             Address: string, Cnic: string, Country: string, City: string, qualification: string,
             // tslint:disable-next-line: variable-name
             specialization: string, current_Status: string, future_Plan: string, know: string, id: string) {
    return this.http.post(this._update + id, {fname: Fname, lname: Lname, pic: 'hello', gender: Gender, phoneno: Phoneno, address: Address,
    cnic: Cnic, country: Country, city: City, Qualification: qualification, Specialization: specialization, Current_Status: current_Status,
  Future_Plan: future_Plan, Know: know});
    }

    AddPic(image: File) {
      const postData = new FormData();
      postData.append('image', image);
      this.http.post<{message: string, post: Pic}>('http://localhost:3000/pic/addpic', postData).
      subscribe(responseData => {
        console.log(responseData.message);
        // this.jwtservice.setImage(responseData.post.id);
        const post: Pic = {
          id: responseData.post.id,
          imagePath: responseData.post.imagePath
        };

        this.pic.push(post);
        this.PicUpdated.next([...this.pic]);
      });
    }
    GetPic() {
      this.http.get<{message: string, posts: any }>('http://localhost:3000/pic/getpic')
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            imagePath: post.imagePath,
          };
        });
      }))
      .subscribe(TransformedPosts => {
        this.pic = TransformedPosts;
        this.PicUpdated.next([...this.pic]);
      });
    }
    GetPostsUpdatedListener() {
      return this.PicUpdated.asObservable();
    }

    GetPic1(id: string) {
      return {...this.pic.find(p => p.id === id)};
    }

  Getphoto(id: string): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appone/' + id);
  }

}
