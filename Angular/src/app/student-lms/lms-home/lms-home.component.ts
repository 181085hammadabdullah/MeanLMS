import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-lms-home',
  templateUrl: './lms-home.component.html',
  styleUrls: ['./lms-home.component.css']
})
export class LmsHomeComponent implements OnInit {

  constructor(public nav: HeaderService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
