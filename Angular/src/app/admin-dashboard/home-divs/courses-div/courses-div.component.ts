import { Component, OnInit } from '@angular/core';
import { Student } from '../../student';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { MystdService } from 'src/app/student-lms/mystd.service';

@Component({
  selector: 'app-courses-div',
  templateUrl: './courses-div.component.html',
  styleUrls: ['./courses-div.component.css']
})
export class CoursesDivComponent implements OnInit {

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
