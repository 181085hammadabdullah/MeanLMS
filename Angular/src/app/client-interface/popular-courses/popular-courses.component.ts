import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
import { Program, Program1 } from 'src/app/admin-dashboard/student';
import { ClientService } from '../client.service';
import { CourseService } from 'src/app/admin-dashboard/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {

  course: Program1[] = [];

  course1: Program1[] = [];

  public programs: Program1[] = [];
  private CourseSub: Subscription;

  constructor(
    private nav: HeaderService,
    private courseService: CourseService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.nav.show();
    this.GetPrograms();
  }
  GetPrograms() {
    this.courseService.GetPrograms();
    this.CourseSub = this.courseService.GetProgramUpdatedListener()
    .subscribe((programs: Program1[]) => {
      this.programs = programs;
      console.log(programs);
    });
  }

  ViewFull(id) {
    this.router.navigate(['Lms/View-Course-Details/' + id]);
  }

}
