import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { Student, Pic } from 'src/app/admin-dashboard/student';
import { AppPendService } from 'src/app/admin-dashboard/app-pend.service';
import { Router } from '@angular/router';
import { MystdService } from '../mystd.service';
import { Subscription } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
UserEmail = '';
Name = '';
public stds: Student[] = [];
lastpics;
public pic: Pic[] = [];
private PostSub: Subscription;
private stdID: string;

  constructor(
    private jwtService: JwtTokenService,
    private apppendService: AppPendService,
    private StdService: MystdService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.UserEmail = this.jwtService.getEmail();
    this.Name = this.jwtService.getname();
    console.log(this.Name);
    this.GetPic();


    // tslint:disable-next-line: only-arrow-functions
    $('.navbar-toggler').click(function() {
      $('.wrapper').toggleClass('show-menu');
    });

    // // tslint:disable-next-line: only-arrow-functions
    // $(document).ready(function() {
    //   // tslint:disable-next-line: only-arrow-functions
    //   $('.SideMenuToggler').on('click', function() {
    //     $('.wrapper').removeClass('.sidemenu');
    // });
    //   });

    this.apppendService.GetStudents()
    .subscribe(data => {
      this.stds = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }

  profileUpdate() {
    this.router.navigate(['Lms', 'Profile', this.Name]);

}
Logout() {
  this.jwtService.destroyToken();
  this.jwtService.destroyEmail();
  this.jwtService.destroyid();
  this.jwtService.destroyname();
  this.router.navigate(['/SignIn']);
}

GetPic() {
  this.StdService.GetPic();
  this.PostSub = this.StdService.GetPostsUpdatedListener()
  .subscribe(posts => {
    // this.pic = posts;
    const lastpic = posts[posts.length - 1];
    // this.Picss = posts.pop();
    this.lastpics = lastpic.imagePath;
    console.log(this.lastpics);
  });
}

Getphoto() {
  this.stdID = this.jwtService.getid();
  this.StdService.Getphoto(this.stdID)
  .subscribe(posts => {
    // const lastpic = posts[posts.length - 1];
    // this.lastpics = lastpic.imagePath;

    console.log('Hello', posts);
  });
}
}
