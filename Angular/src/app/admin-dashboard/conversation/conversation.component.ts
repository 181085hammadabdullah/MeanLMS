import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
import { Router } from '@angular/router';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { ClientAuthService } from 'src/app/client-interface/Client-Auth/client-auth.service';
import { FormBuilder } from '@angular/forms';
import { AppPendService } from '../app-pend.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  public users;
  public name2;
  constructor(
    private fb: FormBuilder,
    public CService: ClientAuthService,
    public jwtService: JwtTokenService,
    private router: Router,
    private nav: HeaderService,
    private Service: AppPendService,
    ) { }

  ngOnInit() {
    this.getusers();
    this.nav.hide();
    // localStorage.removeItem('chatName');
  }

  getusers() {
    this.Service.GetStudents().
    subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }
  chat(name: any) {
  this.name2 = name;
  localStorage.setItem('chatName', this.name2);
  this.router.navigate(['admin-chat', 'chat', name]);
  }

}
