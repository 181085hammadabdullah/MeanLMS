import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';


declare var $: any;
@Component({
  selector: 'app-courses-slider',
  templateUrl: './courses-slider.component.html',
  styleUrls: ['./courses-slider.component.css']
})
export class CoursesSliderComponent implements OnInit {

  constructor(private nav: HeaderService) { }

  ngOnInit() {
    this.nav.show();
  }

}
