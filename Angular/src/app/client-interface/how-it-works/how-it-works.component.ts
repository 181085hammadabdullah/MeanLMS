import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(private nav: HeaderService) { }

  ngOnInit() {
    this.nav.show();
  }

}
