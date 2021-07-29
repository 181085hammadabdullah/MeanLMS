import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  destroyToken() {
    localStorage.removeItem('jwt_token');
  }
// ===========Email
  setEmail(email: string) {
    localStorage.setItem('User', email);
  }
  getEmail() {
    return localStorage.getItem('User');
  }
  destroyEmail() {
    localStorage.removeItem('User');
  }
setid(Id: string) {
localStorage.setItem('_id', Id);
}
getid() {
return localStorage.getItem('_id');
}
destroyid() {
  localStorage.removeItem('_id');
}
setname(name: string) {
  localStorage.setItem('name2', name);
}
getname() {
return localStorage.getItem('name2');
}
destroyname() {
  localStorage.removeItem('name2');
}
setImage(id: string) {
  localStorage.setItem('ImageID', id);
}
getImage() {
return localStorage.getItem('ImageID');
}
destroyImage() {
  localStorage.removeItem('ImageID');
}
}
