import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/admin-dashboard/student';
import { AppPendService } from 'src/app/admin-dashboard/app-pend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MystdService } from '../mystd.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  public student: Student[] = [];
  private id: string;

  constructor(
    public apppendService: AppPendService,
    public StdService: MystdService,
    public router: Router,
    public ActiveRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

  //   this.apppendService.GetStudents()
  //   .subscribe(data => {
  //     this.student = data;
  //     console.log(data);
  //   },
  //   err => {
  //     console.error(err);
  //   });
  // }

  // profileUpdate(id) {
  //   this.router.navigate(['Lms', 'Profile', id])
  }
}
