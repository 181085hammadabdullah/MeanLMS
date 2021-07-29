import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RegisteredStudentsComponent } from './registered-students/registered-students.component';
import { RegisteredStudentsCoursesComponent } from './registered-students-courses/registered-students-courses.component';
import { RegisteredStudentsCoursesBatchComponent } from './registered-students-courses-batch/registered-students-courses-batch.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AdminSigninSignupComponent } from './admin-signin-signup/admin-signin-signup.component';
import { UploadContentPicturesComponent } from './upload-content-pictures/upload-content-pictures.component';
import { UploadContentVideosComponent } from './upload-content-videos/upload-content-videos.component';
import { UploadContentFilesComponent } from './upload-content-files/upload-content-files.component';
import { PostResultsComponent } from './post-results/post-results.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminRoutingModule } from './admin-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { PendingStudentsComponent } from './pending-students/pending-students.component';
import { ViewCoursesComponent } from './Child-Course-Conponents/view-courses/view-courses.component';
import { AddCourseComponent } from './Child-Course-Conponents/add-course/add-course.component';
import { AddNewCourseComponent } from './Child-Course-Conponents/add-new-course/add-new-course.component';
import {MessagesComponent} from './messages/messages.component';
import {AdminChatComponent} from './admin-chat/admin-chat.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './admin-auth/signup/signup.component';
import { SigninComponent } from './admin-auth/signin/signin.component';
import { FileUploadModule} from 'ng2-file-upload';
import { ViewContentComponent } from './upload-content/view-content/view-content.component';
import { ConversationComponent } from './conversation/conversation.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { ShowVideoComponent } from './video-upload/show-video/show-video.component';
import { MatPaginatorModule } from '@angular/material';
import { ViewFullpageComponent } from './child-course-conponents/view-fullpage/view-fullpage.component';
import { NoticeBoardComponent } from './home-divs/notice-board/notice-board.component';
import { AdminServicesComponent } from './home-divs/admin-services/admin-services.component';
import { StudentActivitiesComponent } from './home-divs/student-activities/student-activities.component';
import { CoursesDivComponent } from './home-divs/courses-div/courses-div.component';
@NgModule({
  declarations: [
    TopNavbarComponent,
    SideBarComponent,
    RegisteredStudentsComponent,
    RegisteredStudentsCoursesComponent,
    RegisteredStudentsCoursesBatchComponent,
    UploadContentComponent,
    AssignmentsComponent,
    AdminSigninSignupComponent,
    UploadContentPicturesComponent,
    UploadContentVideosComponent,
    UploadContentFilesComponent,
    PostResultsComponent,
    CoursesComponent,
    InstructorsComponent,
    PendingStudentsComponent,
    ViewCoursesComponent,
    AddCourseComponent,
    AddNewCourseComponent,
    MessagesComponent,
    AdminChatComponent,
    SignupComponent,
    SigninComponent,
    ViewContentComponent,
    ConversationComponent,
    VideoUploadComponent,
    ShowVideoComponent,
    ViewFullpageComponent,
    NoticeBoardComponent,
    AdminServicesComponent,
    StudentActivitiesComponent,
    CoursesDivComponent,
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    FormsModule,
    FileUploadModule,
    MatPaginatorModule
  ],

})
export class AdminDashboardModule { }
