import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { JwtTokenService } from '../../Client-Auth/jwt-token.service';

import { MatDialog, MatDialogConfig, MatBottomSheetRef } from '@angular/material';
import { ConfirmBuyComponent } from '../../view-course-details/view-course/confirm-buy/confirm-buy.component';
import { PopupSigninComponent } from '../../popup-auth/popup-signin/popup-signin.component';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatserviceService } from 'src/app/student-lms/chatservice.service';
import { reverse } from 'lodash';
import { Pic } from 'src/app/admin-dashboard/student';
import { Subscription } from 'rxjs';
import { MystdService } from 'src/app/student-lms/mystd.service';


declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
public UserName = 'Student';

public Name;
public message: string;
public LogInUser;
public messageArray;


lastpics;
public pic: Pic[] = [];
private PostSub: Subscription;

  constructor(
    public chatService: ChatService,
    private jwtService: JwtTokenService,
    private dialog: MatDialog,
    private bottomsheetref: MatBottomSheetRef<ChatComponent>,


    private formBuilder: FormBuilder,
    private Smsservice: ChatService,
    private route: ActivatedRoute,
    private jwtservice: JwtTokenService,
    private StdService: MystdService,
    ) {
      this.Smsservice.newMessageReceived().subscribe(data => {
        this.messageArray = data.message;
        this.messageArray = reverse(this.messageArray);

      });
     }

  ngOnInit() {
    $('.start-chat').hide();
    $('.chat-connection').hide();
    $('.wellcome').show();
    if (this.jwtService.getToken()) {
    this.UserName = this.jwtService.getname();



    this.Name = this.jwtservice.getname();
    this.getchat();
    this.GetPic();

        // tslint:disable-next-line: only-arrow-functions
    $(function() {
          // tslint:disable-next-line: only-arrow-functions
          $('.b1').hover(function() {
            $('.b1').css('background-color', '#0247d1');
            $('.send-icon').css('color', 'white');
          // tslint:disable-next-line: only-arrow-functions
          }),
          // tslint:disable-next-line: only-arrow-functions
          $('.b1').mouseout(function() {
            // on mouseout, reset the background colour
            $('.b1').css('background-color', 'white');
            $('.send-icon').css('color', '#0247d1');
          });
        });
    }
  }
  IconClicked() {
    if (this.jwtService.getToken()) {
    $('.wellcome').hide();
    $('.start-chat').show();
    } else {
    $('.wellcome').hide();
    $('.start-chat').hide();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    this.dialog.open(PopupSigninComponent, dialogConfig);
    this.bottomsheetref.dismiss();
    }

  }
  onChatStart() {
    $('.start-chat').show();
    $('.chat-connection').hide();
  }



  // sendMessage() {
  //   this.LogInUser = localStorage.getItem('name');
  //   this.Smsservice.sendMessage({ message: this.message, sender: this.LogInUser, receiver: 'Admin' });
  //   this.message = '';
  //   }
  //    getchat() {
  //     this.LogInUser = localStorage.getItem('name');
  //     this.Smsservice.getsms( this.LogInUser, 'Admin').subscribe(data => this.messageArray = data);
  //     this.messageArray = reverse(this.messageArray);
  //    }
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

     GotoLMS() {
      this.dialog.closeAll();
      this.bottomsheetref.dismiss();
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
