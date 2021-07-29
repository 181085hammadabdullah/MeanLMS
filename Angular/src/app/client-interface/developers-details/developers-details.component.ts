import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-developers-details',
  templateUrl: './developers-details.component.html',
  styleUrls: ['./developers-details.component.css']
})
export class DevelopersDetailsComponent implements OnInit {


  constructor(private nav: HeaderService, ) { }

  ngOnInit() {
    this.nav.hide();
  }

}
