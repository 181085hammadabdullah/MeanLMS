import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel, LoginResponse, SignupResponse, UserModels } from './user-model';
import { Student } from 'src/app/admin-dashboard/student';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {


  constructor(private http: HttpClient) { }
// --------Pending User
  LogIn(model: UserModel): Observable <LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/users/signin', model);
  }
// --------Approved User
LogIn1(model: UserModel): Observable <LoginResponse> {
  return this.http.post<LoginResponse>('http://localhost:3000/users/signin1', model);
}


// --------Signup User
  SignUp(model: UserModels): Observable <SignupResponse> {
    return this.http.post<SignupResponse>('http://localhost:3000/users/reg', model);
  }





// Get Students

GetStudents(): Observable <Student[]> {
  return this.http.get<Student[]>('http://localhost:3000/users/all');
 }

 GetAppStds(): Observable <Student[]> {
  return this.http.get<Student[]>('http://localhost:3000/admin/appall');
}
}
