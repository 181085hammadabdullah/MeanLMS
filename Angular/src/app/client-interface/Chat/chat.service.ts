import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
// private socket = io('http://localhost:3000');
// visible: boolean;

// constructor() { this.visible = false; }

// hide() { this.visible = false; }

// show() { this.visible = true; }

private socket = io('http://localhost:3000');
private url = 'http://localhost:3000/users/sms';
constructor(private http: HttpClient) {
 }
 getsms(Sender: string, Receiver: string) {
  return this.http.post(this.url, { sender: Sender, receiver: Receiver });
}
 sendMessage(data) {
  this.socket.emit('message', data);
}
newMessageReceived() {
  const observable = new Observable<{ message: string, sender: string, receiver: string }>(observer => {
    this.socket.on('new message', (data) => {
      observer.next(data);
    });
    return () => {
      this.socket.disconnect();
    };
  });
  return observable;
}
}
