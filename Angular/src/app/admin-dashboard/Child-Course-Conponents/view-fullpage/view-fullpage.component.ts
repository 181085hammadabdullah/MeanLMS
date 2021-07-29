import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmBuyComponent } from 'src/app/client-interface/view-course-details/view-course/confirm-buy/confirm-buy.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { HeaderService } from 'src/app/header.service';
import { Program1 } from '../../student';

declare var $: any;
@Component({
  selector: 'app-view-fullpage',
  templateUrl: './view-fullpage.component.html',
  styleUrls: ['./view-fullpage.component.css']
})
export class ViewFullpageComponent implements OnInit {

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
