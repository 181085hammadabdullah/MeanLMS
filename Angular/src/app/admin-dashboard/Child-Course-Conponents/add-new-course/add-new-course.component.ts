import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Program, Program1 } from '../../student';
import { Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { mimeType } from '../../courses/mime-type.valiodator';


declare var $: any;

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent implements OnInit {
  CourseForm: FormGroup;
  public Courses: Program[] = [];
  public imagePreview: string;

  // imagePreview: string;
  private postId: string;
  program: Program1;


  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.initForm();
  }

  navbarActive() {
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
      $('.navbar li').on('click', function() {
        $('.navbar li').removeClass('active');
        $(this).addClass('active');
      });
    });
  }

  private initForm() {
    this.CourseForm = this.fb.group({
      name: ['', Validators.required],
      Duration: ['', Validators.required],
      Fees: ['', Validators.required],
      Introduction: ['', Validators.required],
      learn1: ['', Validators.required],
      learn2: ['', Validators.required],
      learn3: ['', Validators.required],
      learn4: ['', Validators.required],
      learn5: ['', Validators.required],
      learn6: ['', Validators.required],
      Requirement1: ['', Validators.required],
      Requirement2: ['', Validators.required],
      Requirement3: ['', Validators.required],
      Description: ['', Validators.required],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.CourseForm.patchValue({image: file});
    this.CourseForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.CourseForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  AddNewCourse() {
    if (this.CourseForm.invalid) {
      return;
    }
    this.courseService.AddNewCourse(
      this.CourseForm.value.name,
      this.CourseForm.value.Duration,
      this.CourseForm.value.Fees,
      this.CourseForm.value.Introduction,
      this.CourseForm.value.learn1,
      this.CourseForm.value.learn2,
      this.CourseForm.value.learn3,
      this.CourseForm.value.learn4,
      this.CourseForm.value.learn5,
      this.CourseForm.value.learn6,
      this.CourseForm.value.Requirement1,
      this.CourseForm.value.Requirement2,
      this.CourseForm.value.Requirement3,
      this.CourseForm.value.Description,
      this.CourseForm.value.image,
    );
    this.CourseForm.reset();
    this.router.navigate(['/admin-dashboard/courses/all-courses']);
  }




  // AddNewCourse() {
  //   this.courseService.AddCourse(
  //     this.CourseForm.value
  //     ).subscribe(data => {
  //       this.CourseForm.reset();
  //       console.log(data);
  //     }, err => {
  //       console.log(err);
  //     });

  //   // this.router.navigate(['/admin/courses/all-courses']);
  //   console.log(this.CourseForm.value);
  // }



  // AddNewCourse() {
  //   this.courseService.AddCourse(
  //     this.CourseForm.value.id,
  //     this.CourseForm.value.name,
  //     this.CourseForm.value.Introduction,
  //     this.CourseForm.value.Duration,
  //     this.CourseForm.value.Fees,
  //     this.CourseForm.value.learn1,
  //     this.CourseForm.value.learn2,
  //     this.CourseForm.value.learn3,
  //     this.CourseForm.value.learn4,
  //     this.CourseForm.value.learn5,
  //     this.CourseForm.value.learn6,
  //     this.CourseForm.value.Requirement1,
  //     this.CourseForm.value.Requirement2,
  //     this.CourseForm.value.Requirement3,
  //     this.CourseForm.value.Description,
  //   );
  // }

  // private initForm() {
  //   this.CourseForm = this.fb.group({
  //     name: ['', Validators.required],
  //     image: new FormControl(null, {
  //       validators: [Validators.required],
  //       asyncValidators: [mimeType]
  //     }),
  //     Duration: ['', Validators.required],
  //     Fees: ['', Validators.required],
  //     Introduction: ['', Validators.required],
  //     learn1: ['', Validators.required],
  //     learn2: ['', Validators.required],
  //     learn3: ['', Validators.required],
  //     learn4: ['', Validators.required],
  //     learn5: ['', Validators.required],
  //     learn6: ['', Validators.required],
  //     Requirement1: ['', Validators.required],
  //     Requirement2: ['', Validators.required],
  //     Requirement3: ['', Validators.required],
  //     Description: ['', Validators.required],

  //   });
  // }

}
