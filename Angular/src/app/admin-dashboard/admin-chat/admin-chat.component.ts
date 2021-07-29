import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import {AdminchatService} from '../adminchat.service';
import { reverse } from 'lodash';
import { formatDate } from '@angular/common';
import { Pic } from '../student';
import { Subscription } from 'rxjs';
import { MystdService } from 'src/app/student-lms/mystd.service';

declare var $: any;
@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {


  public message: string;
  public messageArray;
  public name2;

  lastpics;
  public pic: Pic[] = [];
  private PostSub: Subscription;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private AdminchatService: AdminchatService, private StdService: MystdService, ) {
    this.AdminchatService.newMessageReceived().subscribe(data => {
      this.messageArray = data.message;
      this.messageArray = reverse(this.messageArray);

    });
   }

   ngOnInit() {

    this.getchat();
    this.GetPic();
  }
  sendMessage() {
    this.name2 = localStorage.getItem('name2');
    this.AdminchatService.sendMessage({ message: this.message, sender: 'Admin', receiver: this.name2 });
    this.message = '';
    }
     getchat() {
      this.name2 = localStorage.getItem('name2');
      this.AdminchatService.getsms( 'Admin', this.name2).subscribe(data => this.messageArray = data);
      this.messageArray = reverse(this.messageArray);
     }

     GetPic() {
      this.StdService.GetPic();
      this.PostSub = this.StdService.GetPostsUpdatedListener()
      .subscribe(posts => {
        // this.pic = posts;
        const lastpic = posts[posts.length - 1];
        // this.Picss = posts.pop();
        this.lastpics = lastpic.imagePath;
        console.log(this.lastpics);
      });
    }

}
