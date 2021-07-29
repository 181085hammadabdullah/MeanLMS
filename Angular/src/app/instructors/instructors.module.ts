import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { StudentsQuestionsComponent } from './students-questions/students-questions.component';
import { UploadComponent } from './upload/upload.component';
import { NewsComponent } from './news/news.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoginComponent, SignupComponent, NavbarComponent,
    HomeComponent, StudentsQuestionsComponent, UploadComponent, NewsComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    StudentsQuestionsComponent
  ]
})
export class InstructorsModule { }
