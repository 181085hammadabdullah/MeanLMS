import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  today: number = new Date().getFullYear();
  constructor(public nav: HeaderService) { }

  ngOnInit() {
    this.nav.hide();
  }

}
