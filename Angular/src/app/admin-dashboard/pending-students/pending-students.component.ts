import { Component, OnInit } from '@angular/core';
import { AppPendService } from '../app-pend.service';
import { Student } from '../student';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pending-students',
  templateUrl: './pending-students.component.html',
  styleUrls: ['./pending-students.component.css']
})
export class PendingStudentsComponent implements OnInit {
  students: Student[] = [];
  std: Student[] = [];
  private PostSub: Subscription;


  constructor(
    private apppendService: AppPendService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.apppendService.GetStudents()
    .subscribe(data => {
      this.students = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
    // this.GetPosts();
  }

  // GetPosts() {
  //   this.apppendService.GetAllStudents();
  //   this.PostSub = this.apppendService.GetStudentUpdatedListener()
  //   .subscribe((posts: Student[]) => {
  //     this.students = posts;
  //     console.log(posts);
  //   });
  // }

  ShowStd(id) {
    this.apppendService.GetStudent(id)
    .subscribe(data => {
      this.std = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }

  Approve() {
    // this.apppendService.ApproveStudent(id)
    // .subscribe(data => {
    //   this.std = data;
    //   console.log(data);
    // },
    // err => {
    //   console.error(err);
    // });
    this.router.navigate(['admin-dashboard/messages']);
  }

}
