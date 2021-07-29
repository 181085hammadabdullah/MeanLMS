import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private nav: HeaderService, private fb: FormBuilder, ) { }

  ngOnInit() {
    this.nav.show();
    this.initForm();
  }

  Singup() {
    console.log(this.contactForm.value);

  }

  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}

