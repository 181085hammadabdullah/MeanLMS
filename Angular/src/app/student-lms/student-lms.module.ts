import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StudentPortalComponent } from './student-portal/student-portal.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentSupportComponent } from './student-support/student-support.component';
import { StudentNotesComponent } from './student-notes/student-notes.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { MyActivitesComponent } from './my-activites/my-activites.component';
import { LmsHomeComponent } from './lms-home/lms-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderService } from '../header.service';
import { TraineeServicesComponent } from './trainee-services/trainee-services.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { ViewLectureComponent } from './view-lecture/view-lecture.component';
import { ViewImplinksComponent } from './view-implinks/view-implinks.component';
import { ViewExerciseComponent } from './view-exercise/view-exercise.component';
import { ViewNotesComponent } from './view-notes/view-notes.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import {StudentChatComponent} from './student-chat/student-chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TopNavbarComponent,
    SideBarComponent,
    StudentPortalComponent,
    StudentProfileComponent,
    StudentSupportComponent,
    StudentNotesComponent,
    MyCoursesComponent,
    NoticeBoardComponent,
    MyActivitesComponent,
    LmsHomeComponent,
    TraineeServicesComponent,
    StudentHomeComponent,
    ViewLectureComponent,
    ViewImplinksComponent,
    ViewExerciseComponent,
    ViewNotesComponent,
    ViewResultsComponent,
    StudentChatComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    TopNavbarComponent,
    SideBarComponent,
    StudentPortalComponent,
    StudentProfileComponent,
    StudentSupportComponent,
    StudentNotesComponent,
    MyCoursesComponent,
    NoticeBoardComponent,
    MyActivitesComponent,
    LmsHomeComponent,
    StudentHomeComponent,
    ViewLectureComponent,
    ViewImplinksComponent,
    ViewExerciseComponent,
    ViewNotesComponent,
    ViewResultsComponent,
    StudentChatComponent,
    FormsModule
  ],
  providers: [HeaderService],
})
export class StudentLmsModule { }
