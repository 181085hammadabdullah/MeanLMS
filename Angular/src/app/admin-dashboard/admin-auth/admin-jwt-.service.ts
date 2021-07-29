
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminJwtService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('Admin_token', token);
  }

  getToken() {
    return localStorage.getItem('Admin_token');
  }

  destroyToken() {
    localStorage.removeItem('Admin_token');
  }
// ===========Email
  setEmail(email: string) {
    localStorage.setItem('Admin_email', email);
  }
  getEmail() {
    return localStorage.getItem('Admin_email');
  }
  destroyEmail() {
    localStorage.removeItem('Admin_email');
  }
setid(Id: string) {
localStorage.setItem('Admin_id', Id);
}
getid() {
return localStorage.getItem('Admin_id');
}
destroyid() {
  localStorage.removeItem('Admin_id');
}
setname(name: string) {
  localStorage.setItem('Admin_name', name);
}
getname() {
return localStorage.getItem('Admin_name');
}
destroyname() {
  localStorage.removeItem('Admin_name');
}

setCourseName(program: string) {
  localStorage.setItem('Program_Name', program);
}

getCourseName() {
  return localStorage.getItem('Program_Name');
}

destroyCourseName() {
  localStorage.removeItem('Program_Name');
}
}
