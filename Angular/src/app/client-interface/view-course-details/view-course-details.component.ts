import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmBuyComponent } from './view-course/confirm-buy/confirm-buy.component';
import { Program1 } from 'src/app/admin-dashboard/student';
import { CourseService } from 'src/app/admin-dashboard/course.service';
import { ActivatedRoute } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-view-course-details',
  templateUrl: './view-course-details.component.html',
  styleUrls: ['./view-course-details.component.css']
})
export class ViewCourseDetailsComponent implements OnInit {
  course1: Program1[] = [];

  constructor(
    private nav: HeaderService,
    private dialog: MatDialog,
    private courseService: CourseService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.nav.hide();
    // this.BuyButton();

    this.GetOneCourse();


  }

  //   GetCourses() {
  //   this.courseService.GetCourses()
  //   .subscribe(data => {
  //     this.course = data;
  //     console.log(data);
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }

  GetOneCourse() {
   this.route.params.subscribe(params => {
     const id = params.id;
     console.log(id);
     this.courseService.GetOneProgram(id).
     subscribe(data => {
       this.course1 = data;
       console.log(data);
     });
   });
  }


  BuyButton() {
    // tslint:disable-next-line: only-arrow-functions
    $('.btn1').click(function() {
      $('.btn1').css('background-color', 'rgb(0, 128, 53)');
    });
  }

  onBuyCourse() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    this.dialog.open(ConfirmBuyComponent, dialogConfig);
  }
}
