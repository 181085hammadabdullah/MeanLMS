import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClientAuthService } from '../client-auth.service';
import { JwtTokenService } from '../jwt-token.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Name = '';
  stdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public CService: ClientAuthService,
    public jwtService: JwtTokenService,
    private router: Router,
    private nav: HeaderService
    ) { }

  ngOnInit() {
    this.Name = this.jwtService.getname();

    this.initForm();

    this.nav.hide();
  }


  SingIn() {
    console.log(this.stdForm.value);

    this.CService.LogIn(this.stdForm.value)
    .subscribe(data => {
      console.log(data);
      this.jwtService.setToken(data.token);
      this.jwtService.setEmail(data.email);
      this.jwtService.setid(data._id);
      this.jwtService.setname(data.name);
      this.router.navigate(['/Lms/']);
    }, err => console.error(err));
  }

  private initForm() {
    this.stdForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
