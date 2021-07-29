import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';


declare var $: any;
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor(private nav: HeaderService) { }

  ngOnInit() {
    this.nav.show();

    // tslint:disable-next-line: only-arrow-functions
    $(function() {
      // tslint:disable-next-line: only-arrow-functions
      $('.item').hover(function() {
        $('.a1').css('color', 'white');
      // tslint:disable-next-line: only-arrow-functions
      }, function() {
        // on mouseout, reset the background colour
        $('.a1').css('color', '');
      });
    });
  }

}
