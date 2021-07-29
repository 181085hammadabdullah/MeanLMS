import { Component, OnInit } from '@angular/core';
import { Program, Program1 } from '../../student';
import { HeaderService } from 'src/app/header.service';
import { CourseService } from '../../course.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  OneProgram: Program1[] = [];
  course: Program1[] = [];
  public programs: Program1[] = [];
  private CourseSub: Subscription;


  constructor(
    private nav: HeaderService,
    private courseService: CourseService,
    private router: Router,
    ) { }

  ngOnInit() {
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

  DeleteProgram(Id: string) {
    this.courseService.DeleteProgram(Id);
    this.router.navigate(['/admin-dashboard/courses/all-courses']);
  }

  Fullpage(Id: string) {
    // window.alert(Id);
    this.router.navigate(['View-Full-Page', Id]);
  }

  GetOneProgram(id) {
    this.courseService.GetOneProgram(id)
    .subscribe(data => {
      this.OneProgram = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }
}
