import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { CoursesComponent } from './courses/courses.component';
import { PendingStudentsComponent } from './pending-students/pending-students.component';
import { RegisteredStudentsComponent } from './registered-students/registered-students.component';
import { ViewCoursesComponent } from './Child-Course-Conponents/view-courses/view-courses.component';
import { AddCourseComponent } from './Child-Course-Conponents/add-course/add-course.component';
import { AddNewCourseComponent } from './Child-Course-Conponents/add-new-course/add-new-course.component';
import { MessagesComponent } from './messages/messages.component';
import {AdminChatComponent} from './admin-chat/admin-chat.component';
import { SigninComponent } from './admin-auth/signin/signin.component';
import { SignupComponent } from './admin-auth/signup/signup.component';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ViewContentComponent } from './upload-content/view-content/view-content.component';
import { UploadContentVideosComponent } from './upload-content-videos/upload-content-videos.component';
import { ConversationComponent } from './conversation/conversation.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { ShowVideoComponent } from './video-upload/show-video/show-video.component';
import { ViewCourseDetailsComponent } from '../client-interface/view-course-details/view-course-details.component';
import { ViewFullpageComponent } from './child-course-conponents/view-fullpage/view-fullpage.component';

const routes: Routes = [

  { path: 'admin', component: SigninComponent },
  { path: 'admin-register', component: SignupComponent },
  { path: 'chats', component: ConversationComponent },


  {
    path: 'admin-dashboard', component: TopNavbarComponent, canActivate: [AdminAuthGuardService], children: [
      { path: '', component: RegisteredStudentsComponent },
      { path: 'students', component: PendingStudentsComponent },
      // { path: 'students/approved', component: RegisteredStudentsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'admin-chat', component: AdminChatComponent },
      {
        path: 'courses', component: CoursesComponent, children: [
          { path: 'all-courses', component: ViewCoursesComponent },
          // { path: 'add-new-course', component: AddCourseComponent},
          { path: 'add-new-course', component: AddNewCourseComponent },

        ]
      },
      { path: 'upload', component: UploadContentComponent },
      { path: 'view-uploads', component: ViewContentComponent },
      { path: 'add-lectures', component: VideoUploadComponent },
      { path: 'show-videos', component: ShowVideoComponent },
      // { path: 'add-lectures', component: UploadContentVideosComponent },
    ]
  },
  { path: '', component: PendingStudentsComponent },
  { path: 'View-Full-Page/:id', component: ViewCourseDetailsComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
