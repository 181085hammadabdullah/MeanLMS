import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { mimeType } from '../../courses/mime-type.valiodator';
import { CourseService } from '../../course.service';
import { Program } from '../../student';
import { Router } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  CourseForm: FormGroup;
  public Courses: Program[] = [];
  public imagePreview: string;

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

  // AddCourse() {
  //   this.courseService.AddCourse(this.CourseForm.value)
  //   .subscribe(data => {
  //     console.log(data);
  //     this.router.navigate(['/admin/courses/all-courses']);
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }

  AddCourse() {
    // if (this.CourseForm.invalid) {
    //   return;
    // }
    // this.courseService.AddCourse(
    //   this.CourseForm.value.name,
    //   // this.CourseForm.value.image,
    //   // this.CourseForm.value.Duration,
    //   // this.CourseForm.value.Fees,
    //   // this.CourseForm.value.Description,
    //   );

    // this.router.navigate(['/admin/courses/all-courses']);

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

  private initForm() {
    this.CourseForm = this.fb.group({
      name: ['', Validators.required],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      Duration: ['', Validators.required],
      Fees: ['', Validators.required],
      Description: ['', Validators.required],
      // image: ['', Validators.required],
    });
  }
}
