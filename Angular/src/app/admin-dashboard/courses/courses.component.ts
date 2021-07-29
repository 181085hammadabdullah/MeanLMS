import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CourseService } from '../course.service';
import { Program } from '../student';
import { mimeType } from './mime-type.valiodator';


declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  CourseForm: FormGroup;
  public Courses: Program[] = [];
  public imagePreview: string;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    ) { }

  ngOnInit() {
    this.initForm();
    this.navbarActive();
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

  AddCourse() {
    // this.courseService.AddCourse(this.CourseForm.value)
    // .subscribe(data => {
    //   console.log(data);
    // },
    // error => {
    //   console.error(error);
    // });
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
      Duration: ['', Validators.required],
      Fees: ['', Validators.required],
      Description: ['', Validators.required],
      // image: ['', Validators.required],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }
}
