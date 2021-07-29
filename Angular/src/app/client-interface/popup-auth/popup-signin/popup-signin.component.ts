import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientAuthService } from '../../Client-Auth/client-auth.service';
import { JwtTokenService } from '../../Client-Auth/jwt-token.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';
import { MatDialogRef, MatBottomSheetRef } from '@angular/material';
import { ChatComponent } from '../../Chat/chat/chat.component';

@Component({
  selector: 'app-popup-signin',
  templateUrl: './popup-signin.component.html',
  styleUrls: ['./popup-signin.component.css']
})
export class PopupSigninComponent implements OnInit {

  stdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public CService: ClientAuthService,
    public jwtService: JwtTokenService,
    private router: Router,
    private nav: HeaderService,
    private dialogRef: MatDialogRef<PopupSigninComponent>,
    ) { }

  ngOnInit() {
    this.initForm();

    this.nav.show();
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
    }, err => console.error(err));

    this.router.navigate(['/home']);
    this.dialogRef.close();
  }

  Register() {
    this.router.navigate(['/SignUp']);
    this.dialogRef.close();
  }
  private initForm() {
    this.stdForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
