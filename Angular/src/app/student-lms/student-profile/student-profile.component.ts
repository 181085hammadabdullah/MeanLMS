import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { JwtTokenService } from 'src/app/client-interface/Client-Auth/jwt-token.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Student, Pic } from 'src/app/admin-dashboard/student';
import { MystdService } from '../mystd.service';
import { mimeType } from 'src/app/admin-dashboard/courses/mime-type.valiodator';
import { Subscription } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  UserEmail = '';
  FirstName = '';
  profileForm: FormGroup;
  picForm: FormGroup;
  public student: Student[] = [];
  public students: Student;
  public pic: Pic[] = [];
  lastpics;
  private PostSub: Subscription;

  private stdID: string;
public fname;
public lname;
public gender;
public phoneno;
public address;
public cnic;
public country;
public city;
public Qualification;
public Specialization;
// tslint:disable-next-line: variable-name
public Current_Status;
// tslint:disable-next-line: variable-name
public Future_Plan;
public  Know;
public Data;


ImagePreview: string;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtTokenService,
    private ActiveRoute: ActivatedRoute,
    private StdService: MystdService,
    private router: Router,
    private Arouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.stdID = this.jwtService.getid();
    this.UserEmail = this.jwtService.getEmail();
    this.FirstName = this.jwtService.getname();
    this.initForm();
    this.initPic();
    this.GetFields();
    this.GetPic();




    // tslint:disable-next-line: only-arrow-functions
    $(function() {
      // tslint:disable-next-line: only-arrow-functions
      $('.icon-edit').click(function() {
        $('.student-form').css('display', 'block');
        $('.profile-list').css('display', 'none');
      // tslint:disable-next-line: only-arrow-functions
      }),
      // tslint:disable-next-line: only-arrow-functions
      $('.done').click(function() {
        // on mouseout, reset the background colour
        $('.student-form').css('display', 'none');
        $('.profile-list').css('display', 'block');
      });
    });

    // tslint:disable-next-line: only-arrow-functions
    $('.edit-image').on('mouseover', function() {
      $('.image').css('opacity', '0.3');
   // tslint:disable-next-line: only-arrow-functions
   }).on('mouseout', function() {
      $('.image').css('opacity', '1');
   });
    // tslint:disable-next-line: only-arrow-functions
    $('.image').on('mouseover', function() {
      $(this).css('opacity', '0.4');
   // tslint:disable-next-line: only-arrow-functions
   }).on('mouseout', function() {
      $(this).css('opacity', '1');
   });

  //  Get Pic for editing
// this.ActiveRoute.paramMap.subscribe((paramMap: ParamMap) => {});

  }



private GetFields() {
  this.stdID = this.jwtService.getid();
  this.StdService.GetStd(this.stdID)
  .subscribe(studentData => {
    this.student = studentData;
    console.log(studentData);
  },
  err => {
    console.error(err);
  });

  // this.ActiveRoute.params.subscribe(params => {
  //   const id = params.id;
  //   this.StdService.GetStd(id)
  //   .subscribe(student => {
  //     // tslint:disable-next-line: no-debugger
  //     debugger;
  //     this.student = student;
  //     this.profileForm.patchValue(this.student);
  //   });
  // });
}

  UpdateProfile(profileForm: any) {
   this.fname = profileForm.controls.fname.value;
   this.lname = profileForm.controls.lname.value;
   this.gender = profileForm.controls.gender.value;
   this.phoneno = profileForm.controls.phoneno.value;
   this.address = profileForm.controls.address.value;
   this.cnic = profileForm.controls.cnic.value;
   this.country = profileForm.controls.country.value;
   this.city = profileForm.controls.city.value;
   this.Qualification = profileForm.controls.Qualification.value;
   this.Specialization = profileForm.controls.Specialization.value;
   this.Current_Status = profileForm.controls.Current_Status.value;
   this.Future_Plan = profileForm.controls.Future_Plan.value;
   this.Know = profileForm.controls.Know.value;
   if (this.profileForm.valid) {
      this.StdService.UpdateUser(this.fname, this.lname, this.gender, this.phoneno, this.address, this.cnic, this.country, this.city
        // tslint:disable-next-line: max-line-length
        , this.Qualification, this.Specialization, this.Current_Status, this.Future_Plan, this.Know, this.stdID)
        .subscribe(data => (this.Data = data));
     }
   this.router.navigate(['/Lms']);


  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.picForm.patchValue({image: file});
    this.picForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.picForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.ImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  private initForm() {
    this.profileForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      phoneno: ['', Validators.required],
      address: ['', Validators.required],
      cnic: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      Qualification: ['', Validators.required],
      Specialization: ['', Validators.required],
      Current_Status: ['', Validators.required],
      Future_Plan: ['', Validators.required],
      Know: ['', Validators.required],
    });
  }

  private initPic() {
    this.picForm = this.fb.group({
      image: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
  }
  UpdatePic() {
    this.StdService.AddPic(
      this.picForm.value.image,
    );
    this.picForm.reset();
  }
  GetPic() {
    this.StdService.GetPic();
    this.PostSub = this.StdService.GetPostsUpdatedListener()
    .subscribe(posts => {
      // this.pic = posts;
      const lastpic = posts[posts.length - 1];
      // this.Picss = posts.pop();
      this.lastpics = lastpic.imagePath;
      console.log(this.lastpics);
    });
  }
  GetPic1() {
    this.StdService.GetPic();
    this.PostSub = this.StdService.GetPostsUpdatedListener()
    .subscribe((posts: Pic[]) => {
      this.pic = posts;
      console.log(posts);
    });
  }
}
