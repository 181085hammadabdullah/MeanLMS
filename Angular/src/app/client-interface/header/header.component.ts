import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';


declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public nav: HeaderService) { }

  ngOnInit() {
    this.nav.hide();



    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.navbar-nav li').on('click', function() {
        $('.navbar-nav li').removeClass('active');
        $(this).addClass('active');
      });
      // tslint:disable-next-line: only-arrow-functions
      $('.nav-link').click(function() {
        $('#navbarDiv').collapse('hide');
        });
      });
   }

}
