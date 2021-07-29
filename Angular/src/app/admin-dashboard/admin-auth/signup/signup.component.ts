import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public CService: AdminAuthService,
    private router: Router,
    private nav: HeaderService

    ) { }

  ngOnInit() {
    this.initForm();

    this.nav.hide();
  }

  Singup() {
    console.log(this.adminForm.value);

    this.CService.SignUp(this.adminForm.value)
    .subscribe(data => {
      console.log(data);
      this.adminForm.reset();
      this.router.navigate(['/admin']);
    }, err => console.error(err));
  }

  private initForm() {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
