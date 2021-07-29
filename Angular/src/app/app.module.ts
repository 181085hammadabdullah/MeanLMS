import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {FileUploadModule} from 'ng2-file-upload';
import {MatPaginatorModule} from '@angular/material';


import { ClientInterfaceModule } from './client-interface/client-interface.module';
import { StudentLmsModule } from './student-lms/student-lms.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { InstructorsModule } from './instructors/instructors.module';
import { ViewCourseModule } from './client-interface/view-course-details/view-course/view-course.module';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderService } from './header.service';
import { ViewCoursesComponent } from './Child-Course-Conponents/view-courses/view-courses.component';
import { ConfirmBuyComponent } from './client-interface/view-course-details/view-course/confirm-buy/confirm-buy.component';
import { ChatComponent } from './client-interface/Chat/chat/chat.component';
import { PopupSigninComponent } from './client-interface/popup-auth/popup-signin/popup-signin.component';
import { StudentChatComponent } from './student-lms/student-chat/student-chat.component';
import { ViewNewsComponent } from './client-interface/new-events/view-news/view-news.component';
import { DevelopersComponent } from './client-interface/developers/developers.component';





@NgModule({
  declarations: [
    AppComponent,
    ViewCoursesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientInterfaceModule,
    StudentLmsModule,
    AdminDashboardModule,
    InstructorsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    ViewCourseModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    FileUploadModule,
  ],
  providers: [HeaderService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmBuyComponent, ChatComponent, PopupSigninComponent, ViewNewsComponent, DevelopersComponent]
})
export class AppModule { }
