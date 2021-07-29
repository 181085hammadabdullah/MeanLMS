import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ChatserviceService} from '../chatservice.service';
import { reverse } from 'lodash';
import { formatDate } from '@angular/common';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { MystdService } from '../mystd.service';
import { Pic } from 'src/app/admin-dashboard/student';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.css']
})
export class StudentChatComponent implements OnInit {

  public message: string;
  public LogInUser;
  public messageArray;

  lastpics;
public pic: Pic[] = [];
private PostSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private Smsservice: ChatserviceService,
    private route: ActivatedRoute,
    private StdService: MystdService,
  ) {
    this.Smsservice.newMessageReceived().subscribe(data => {
      this.messageArray = data.message;
      this.messageArray = reverse(this.messageArray);

    });
  }

  ngOnInit() {
    this.getchat();
    this.GetPic();
  }
  sendMessage() {
    this.LogInUser = localStorage.getItem('name2');
    this.Smsservice.sendMessage({ message: this.message, sender: this.LogInUser, receiver: 'Admin' });
    this.message = '';
    }
     getchat() {
      this.LogInUser = localStorage.getItem('name2');
      this.Smsservice.getsms( this.LogInUser, 'Admin').subscribe(data => this.messageArray = data);
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
