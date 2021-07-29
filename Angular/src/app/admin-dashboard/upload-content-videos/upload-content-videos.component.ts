import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Program1 } from '../student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-content-videos',
  templateUrl: './upload-content-videos.component.html',
  styleUrls: ['./upload-content-videos.component.css']
})
export class UploadContentVideosComponent implements OnInit {

  OneProgram: Program1[] = [];
  public programs: Program1[] = [];
  private CourseSub: Subscription;

  constructor(
    private courseService: CourseService
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
}
