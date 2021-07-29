import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppPendService {

  private students: Student[] = [];
  private StudntsUpdated = new Subject<Student[]>();

private url = 'http://localhost:3000/users/all/';
  constructor(private http: HttpClient) { }

  // -----------------------------------------------------------------------------------Pending
  GetStudent(id: string): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appone/' + id);
  }

  GetStudents(): Observable <Student[]> {
   return this.http.get<Student[]>('http://localhost:3000/users/appall');
  }
  getContas(): Observable<any> {
    return this.http.get('http://localhost:3000/users/appall');
  }

  // GetAllStudents() {
  //   this.http.get<{message: string, students: any }>('http://localhost:3000/users/appall')
  //   .pipe(map((postData) => {
  //     return postData.students.map(post => {
  //       return {
  //         _id: post._id,
  //         status: post.status,
  //         profile: {
  //           First_Name: post.profile.First_Name,
  //           Last_Name: post.profile.Last_Name,
  //           Gender: post.profile.Gender,
  //           Email: post.profile.Email,
  //           Password: post.profile.Password,
  //           Phone_No: post.profile.Phone_No,
  //           Address: post.profile.Address,
  //           CNIC: post.profile.CNIC,
  //           Country: post.profile.Country,
  //           City: post.profile.City,
  //       },
  //       Acedmic: {
  //           Qualification: post.Acedmic.Qualification,
  //           Specialization: post.Acedmic.Specialization,
  //           Current_Status: post.Acedmic.Current_Status,
  //           Future_Plan: post.Acedmic.Future_Plan,
  //           Know: post.Acedmic.Know,
  //       },
  //       Program: [{
  //         id: post.Program.id,
  //         name: post.Program.name,
  //         Duration: post.Program.Duration,
  //         Fees: post.Program.Fees,
  //         Introduction: post.Program.Introduction,
  //         learn1: post.Program.learn1,
  //         learn2: post.Program.learn2,
  //         learn3: post.Program.learn3,
  //         learn4: post.Program.learn4,
  //         learn5: post.Program.learn5,
  //         learn6: post.Program.learn6,
  //         Requirement1: post.Program.Requirement1,
  //         Requirement2: post.Program.Requirement2,
  //         Requirement3: post.Program.Requirement3,
  //         Description: post.Program.Description,
  //         imagePath: post.Program.imagePath,
  //       }]
  //       };
  //     });
  //   }))
  //   .subscribe(TransformedPosts => {
  //     this.students = TransformedPosts;
  //     this.StudntsUpdated.next([...this.students]);
  //   });
  // }
  GetStudentUpdatedListener() {
    return this.StudntsUpdated.asObservable();
  }
// --------------------------------------------------------------------------------------Approved
  GetAppStds(): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appall');
  }
  GetAppStd(id: string): Observable <Student[]> {
    return this.http.get<Student[]>('http://localhost:3000/users/appone/' + id);
  }

// --------------------------------------------------------------------------------------Approve Button

// ApproveStudent(id: string, body: Student[]) {
//   return this.http.post<Student[]>('http://localhost:3000/admin/appuser/' + id, body);
// }
getall() {
return this.http.get(this.url);
}
}
