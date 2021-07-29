import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { AppPendService } from '../app-pend.service';

@Component({
  selector: 'app-registered-students',
  templateUrl: './registered-students.component.html',
  styleUrls: ['./registered-students.component.css']
})
export class RegisteredStudentsComponent implements OnInit {
  students: Student[] = [];
  std: Student[] = [];


  constructor(private apppendService: AppPendService) { }

  ngOnInit() {
    this.apppendService.GetAppStds()
    .subscribe(data => {
      this.students = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }


  ShowStd(id) {
    this.apppendService.GetAppStd(id)
    .subscribe(data => {
      this.std = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }

}
