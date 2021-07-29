import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';
import { AdminJwtService } from '../admin-jwt-.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public CService: AdminAuthService,
    public jwtService: AdminJwtService,
    private router: Router,
    private nav: HeaderService
    ) { }

  ngOnInit() {
    this.initForm();

    this.nav.hide();
  }


  SingIn() {
    console.log(this.adminForm.value);

    this.CService.LogIn(this.adminForm.value)
    .subscribe(data => {
      console.log(data);
      this.jwtService.setToken(data.token);
      this.jwtService.setEmail(data.user.email);
      this.jwtService.setid(data.user._id);
      this.jwtService.setname(data.user.name);
      this.router.navigate(['/admin-dashboard']);
      console.log(data.user.name);

    }, err => console.error(err));
  }

  private initForm() {
    this.adminForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.length],
    });
  }
}
