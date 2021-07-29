import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderBannerComponent } from './slider-banner/slider-banner.component';
import { SusseccStoriesComponent } from './sussecc-stories/sussecc-stories.component';
import { PopularCoursesComponent } from './popular-courses/popular-courses.component';
import { NewEventsComponent } from './new-events/new-events.component';
import { StatsComponent } from './stats/stats.component';
import { VisionMissionComponent } from './vision-mission/vision-mission.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
// import { SigninSignupComponent } from './Client-Auth/signin-signup/signin-signup.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoursesSliderComponent } from './courses-slider/courses-slider.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { SigninComponentComponent } from './Client-Auth/signin-component/signin-component.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Client-Auth/login/login.component';
import { SignupComponent } from './Client-Auth/signup/signup.component';
import { HeaderService } from '../header.service';
import { ViewCourseDetailsComponent } from './view-course-details/view-course-details.component';
import { ChatComponent } from './Chat/chat/chat.component';
import { PopupSigninComponent } from './popup-auth/popup-signin/popup-signin.component';
import { PopupSignupComponent } from './popup-auth/popup-signup/popup-signup.component';
import { ViewNewsComponent } from './new-events/view-news/view-news.component';
import { DevelopersComponent } from './developers/developers.component';
import { DevelopersDetailsComponent } from './developers-details/developers-details.component';
import { DevelopersProfilesComponent } from './developers-profiles/developers-profiles.component';
// import { SigninComponent } from './popup-auth/signin/signin.component';
// import { SignupComponent } from './popup-auth/signup/signup.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SliderBannerComponent,
    SusseccStoriesComponent,
    PopularCoursesComponent,
    NewEventsComponent,
    StatsComponent,
    VisionMissionComponent,
    HowItWorksComponent,
    ContactUsComponent,
    // SigninSignupComponent,
    FaqsComponent,
    HomeComponent,
    CoursesSliderComponent,
    // SigninComponentComponent,
    LoginComponent,
    SignupComponent,
    ViewCourseDetailsComponent,
    ChatComponent,
    PopupSigninComponent,
    PopupSignupComponent,
    ViewNewsComponent,
    DevelopersComponent,
    DevelopersDetailsComponent,
    DevelopersProfilesComponent,

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
    HeaderComponent,
    FooterComponent,
    SliderBannerComponent,
    SusseccStoriesComponent,
    PopularCoursesComponent,
    NewEventsComponent,
    StatsComponent,
    VisionMissionComponent,
    HowItWorksComponent,
    ContactUsComponent,
    // SigninSignupComponent,
    FaqsComponent,
    HomeComponent
  ],
  providers: [],
})
export class ClientInterfaceModule { }
