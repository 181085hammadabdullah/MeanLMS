import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { MystdService } from '../mystd.service';
import { Student } from 'src/app/admin-dashboard/student';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  student: Student[] = [];
  programArray = [];
  public students: Student;
  private stdID: string;

  constructor(
    private jwtService: JwtTokenService,
    private StdService: MystdService,
    ) { }

  ngOnInit() {
    this.GetFields();
  }

  private GetFields() {
    this.stdID = this.jwtService.getid();
    this.StdService.GetStd(this.stdID)
    .subscribe(studentData => {
      this.student = studentData;
      // this.programArray = studentData;
      console.log(studentData);
    },
    err => {
      console.error(err);
    });
  }
}
