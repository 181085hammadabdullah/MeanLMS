import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './client-interface/home/home.component';
import { PopularCoursesComponent } from './client-interface/popular-courses/popular-courses.component';
import { NewEventsComponent } from './client-interface/new-events/new-events.component';
import { HowItWorksComponent } from './client-interface/how-it-works/how-it-works.component';
import { FaqsComponent } from './client-interface/faqs/faqs.component';
import { StatsComponent } from './client-interface/stats/stats.component';
import { VisionMissionComponent } from './client-interface/vision-mission/vision-mission.component';
import { ContactUsComponent } from './client-interface/contact-us/contact-us.component';
import { LoginComponent } from './client-interface/Client-Auth/login/login.component';
import { SignupComponent } from './client-interface/Client-Auth/signup/signup.component';
import { LmsHomeComponent } from './student-lms/lms-home/lms-home.component';
import { StudentProfileComponent } from './student-lms/student-profile/student-profile.component';
import { StudentPortalComponent } from './student-lms/student-portal/student-portal.component';
import { StudentSupportComponent } from './student-lms/student-support/student-support.component';
import { StudentHomeComponent } from './student-lms/student-home/student-home.component';
import { ViewLectureComponent } from './student-lms/view-lecture/view-lecture.component';
import { ViewImplinksComponent } from './student-lms/view-implinks/view-implinks.component';
import { ViewExerciseComponent } from './student-lms/view-exercise/view-exercise.component';
import { ViewNotesComponent } from './student-lms/view-notes/view-notes.component';
import { ViewResultsComponent } from './student-lms/view-results/view-results.component';
import { ViewCourseDetailsComponent } from './client-interface/view-course-details/view-course-details.component';
import { AuthGuardService } from './auth-guard.service';
import { StudentChatComponent } from './student-lms/student-chat/student-chat.component';
import { ChatComponent } from './client-interface/Chat/chat/chat.component';
import { ConversationComponent } from './admin-dashboard/conversation/conversation.component';
import { AdminAuthGuardService } from './admin-dashboard/admin-auth-guard.service';
import { AdminchatService } from './admin-dashboard/adminchat.service';
import { AdminChatComponent } from './admin-dashboard/admin-chat/admin-chat.component';
import { StudentsQuestionsComponent } from './instructors/students-questions/students-questions.component';
import { DevelopersDetailsComponent } from './client-interface/developers-details/developers-details.component';
import { DevelopersProfilesComponent } from './client-interface/developers-profiles/developers-profiles.component';

const routes: Routes = [

  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'Courses', component: PopularCoursesComponent},
  { path: 'News-and-Events', component: NewEventsComponent},
  { path: 'How-it-works', component: HowItWorksComponent},
  { path: 'Faqs', component: FaqsComponent},
  { path: 'About-Us', component: VisionMissionComponent },
  { path: 'Contact-Us', component: ContactUsComponent},
  { path: 'SignIn', component: LoginComponent},
  { path: 'SignUp', component: SignupComponent},
  { path: 'Main-Features', component: DevelopersDetailsComponent},
  { path: 'Developers-Profile', component: DevelopersProfilesComponent},
  // { path: 's', component: StudentsQuestionsComponent},

  // Lms-Module

  { path: 'Lms', component: LmsHomeComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: StudentHomeComponent, canActivateChild: [AuthGuardService]},
    { path: 'Profile/:name', component: StudentProfileComponent, canActivateChild: [AuthGuardService]},
    // { path: 'Profile/:id', component: StudentProfileComponent},
    { path: 'Lectures', component: StudentPortalComponent, canActivateChild: [AuthGuardService]},
    { path: 'Support', component: StudentSupportComponent, canActivateChild: [AuthGuardService]},
    { path: 'Lectures/view-lecture', component: ViewLectureComponent, canActivateChild: [AuthGuardService]},
    { path: 'Important-links', component: ViewImplinksComponent, canActivateChild: [AuthGuardService]},
    { path: 'Exercises', component: ViewExerciseComponent, canActivateChild: [AuthGuardService]},
    { path: 'Notes', component: ViewNotesComponent, canActivateChild: [AuthGuardService]},
    { path: 'My-Results', component: ViewResultsComponent, canActivateChild: [AuthGuardService]},
    { path: 'student-chat', component: StudentChatComponent, canActivateChild: [AuthGuardService]},
  ]},

  { path: 'Lms/View-Course-Details/:id', canActivate: [AuthGuardService], component: ViewCourseDetailsComponent},
  // { path: 'Lms/View-Course-Details', canActivate: [AuthGuardService], component: ViewCourseDetailsComponent},

  { path: 'admin-chat', component: ConversationComponent, canActivate: [AdminAuthGuardService], children: [
  { path: 'chat/:name', component: AdminChatComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
