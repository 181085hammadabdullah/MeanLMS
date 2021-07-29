import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientAuthService } from '../client-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  stdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public CService: ClientAuthService,
    private router: Router,
    private nav: HeaderService

    ) { }

  ngOnInit() {
    this.initForm();

    this.nav.hide();
  }
  Singup() {
    console.log(this.stdForm.value);

    this.CService.SignUp(this.stdForm.value)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/SignIn']);
    }, err => console.error(err));
  }

  private initForm() {
    this.stdForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      fname: ['', Validators.required]
    });
  }


}
