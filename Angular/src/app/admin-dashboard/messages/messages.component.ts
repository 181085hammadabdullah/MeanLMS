import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Student } from 'src/app/admin-dashboard/student';
import { AppPendService } from '../app-pend.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public users;
  public name2;
  constructor(private Service: AppPendService, private router: Router) { }

  ngOnInit() {
    this.getusers();
  }
  getusers() {
    this.Service.GetStudents().subscribe(data => (this.users = data));
  }
  chat(name: any) {
this.name2 = name;
localStorage.setItem('name2', this.name2);
this.router.navigate(['admin-dashboard/admin-chat']);
  }
}
