import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Student, Program, Program1 } from './student';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private programs: Program1[] = [];
  private programUpdated = new Subject<Program1[]>();

  // private progr: Program[] = [];
  // private progUpdated = new Subject<Program[]>();

  constructor(private http: HttpClient) { }

  AddNewCourse(
      name: string, Duration: string, Fees: string, Introduction: string, learn1: string, learn2: string,
      learn3: string, learn4: string, learn5: string, learn6: string, Requirement1: string, Requirement2: string,
      Requirement3: string, Description: string, image: File) {
        const courseData = new FormData();
        courseData.append('name', name);
        courseData.append('Duration', Duration);
        courseData.append('Fees', Fees);
        courseData.append('Introduction', Introduction);
        courseData.append('learn1', learn1);
        courseData.append('learn2', learn2);
        courseData.append('learn3', learn3);
        courseData.append('learn4', learn4);
        courseData.append('learn5', learn5);
        courseData.append('learn6', learn6);
        courseData.append('Requirement1', Requirement1);
        courseData.append('Requirement2', Requirement2);
        courseData.append('Requirement3', Requirement3);
        courseData.append('Description', Description);
        courseData.append('image', image);
        this.http.post<{message: string, program: Program1}>('http://localhost:3000/program/addprogram', courseData).
        subscribe(responseData => {
          console.log(responseData.message);
          const course = {
            id: responseData.program.id,
            // tslint:disable-next-line: object-literal-shorthand
            name: name , Duration: Duration, Fees: Fees, Introduction: Introduction, learn1: learn1, learn2: learn2,
            // tslint:disable-next-line: object-literal-shorthand
            learn3: learn3, learn4: learn4, learn5: learn5, learn6: learn6, Requirement1: Requirement1, Requirement2: Requirement2,
            // tslint:disable-next-line: object-literal-shorthand
            Requirement3: Requirement3, Description: Description, imagePath: responseData.program.imagePath
          };
          this.programs.push(course);
          this.programUpdated.next([...this.programs]);
        });
      }

      GetPrograms() {
        this.http.get<{message: string, programs: any }>('http://localhost:3000/program/getprograms')
        .pipe(map((courseData) => {
          return courseData.programs.map(course => {
            return {
              name: course.name,
              Duration: course.Duration,
              Fees: course.Fees,
              Introduction: course.Introduction,
              learn1: course.learn1,
              learn2: course.learn2,
              learn3: course.learn3,
              learn4: course.learn4,
              learn5: course.learn5,
              learn6: course.learn6,
              Requirement1: course.Requirement1,
              Requirement2: course.Requirement2,
              Requirement3: course.Requirement3,
              Description: course.Description,
              id: course._id,
              imagePath: course.imagePath,
            };
          });
        }))
        .subscribe(TransformedPrograms => {
          this.programs = TransformedPrograms;
          this.programUpdated.next([...this.programs]);
        });
      }

      GetProgramUpdatedListener() {
        return this.programUpdated.asObservable();
      }

      GetOneProgram(id: string): Observable <Program1[]> {
        return this.http.get<Program1[]>('http://localhost:3000/program/program/' + id);
      }

      DeleteProgram(Id: string) {
        this.http.delete('http://localhost:3000/program/deleteprogram/' + Id)
        .subscribe(() => {
          // tslint:disable-next-line: triple-equals
          const updatedprograms = this.programs.filter(course => course.id !== Id);
          this.programs = updatedprograms;
          this.programUpdated.next([...this.programs]);
        });
        console.log('Program has been deleted!');
      }

  // GetPrograms() {
  //   this.http.get<{message: string, courses: Program1[]}>('http://localhost:3000/program/getprograms').
  //   subscribe((courseData) => {
  //     this.programs = courseData.courses;
  //     this.programUpdated.next([...this.programs]);
  //     // console.log(courseData.message);
  //   });
  // }



  // AddNewCourse(
  //   name: string, Duration: string, Fees: string, Introduction: string, learn1: string, learn2: string,
  //   learn3: string, learn4: string, learn5: string, learn6: string, Requirement1: string, Requirement2: string,
  //   Requirement3: string, Description: string,
  // ) {
  //   const Course: Program1 = {
  //     // tslint:disable-next-line: object-literal-shorthand
  //     id: null, name: name, Duration: Duration, Fees: Fees, Introduction: Introduction, learn1: learn1, learn2: learn2,
  //     // tslint:disable-next-line: object-literal-shorthand
  //     learn3: learn3, learn4: learn4, learn5: learn5, learn6: learn6, Requirement1: Requirement1, Requirement2: Requirement2,
  //     // tslint:disable-next-line: object-literal-shorthand
  //     Requirement3: Requirement3, Description: Description,
  //   };
  //   this.programs.push(Course);
  //   this.programUpdated.next([...this.programs]);
  // }


  // AddCourse78657(body: Program1): Observable <Program1[]> {
  //   return this.http.post<Program1[]>('http://localhost:3000/program/addprogram', body);
  // }

  // GetCourses32(): Observable <Program1[]> {
  //   return this.http.get<Program1[]>('http://localhost:3000/program/getprograms');
  // }

  // GetOneCourse(id: string): Observable <Program1[]> {
  //   return this.http.get<Program1[]>('http://localhost:3000/program/program/' + id);
  // }

}
