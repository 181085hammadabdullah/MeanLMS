import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminLoginResponse, AdminModel, AdminSignupResponse, AdminModels } from './Admin.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient) { }

  LogIn(model: AdminModel): Observable <AdminLoginResponse> {
    return this.http.post<AdminLoginResponse>('http://localhost:3000/admin/signin', model);
  }

  SignUp(model: AdminModels): Observable <AdminSignupResponse> {
    return this.http.post<AdminSignupResponse>('http://localhost:3000/admin/reg', model);
  }

}
