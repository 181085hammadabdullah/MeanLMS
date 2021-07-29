import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { AdminJwtService } from '../admin-auth/admin-jwt-.service';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/header.service';

declare var $: any;
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
AdminEmail = '';
AdminName = '';
  constructor(
    private jwtService: AdminJwtService,
    private router: Router,
    private nav: HeaderService
    ) { }

  ngOnInit() {
    this.nav.hide();

    this.AdminEmail = this.jwtService.getEmail();
    this.AdminName = this.jwtService.getname();


    // tslint:disable-next-line: only-arrow-functions
    $('.navbar-toggler').click(function() {
      $('.wrapper').toggleClass('show-menu');
    });
  }

  Logout() {
    this.jwtService.destroyToken();
    this.jwtService.destroyEmail();
    this.jwtService.destroyname();
    this.jwtService.destroyid();
    this.router.navigate(['/admin']);
  }

}
