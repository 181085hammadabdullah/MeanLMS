import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

// import {FileUploader} from 'ng2-file-upload';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Promise, reject } from 'q';
import { mimeType } from '../courses/mime-type.valiodator';
import { Post } from '../student';
// import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/lecture/addimage';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html',
  styleUrls: ['./upload-content.component.css']
})
export class UploadContentComponent implements OnInit {


  postForm: FormGroup;
  ImagePreview: string;
  private postId: string;
  post: Post;

  constructor(
    private postsService: NewsService,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.postForm = this.fb.group({
      postHeading: ['', Validators.required],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      postContent: ['', Validators.required],
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.postForm);
    const reader = new FileReader();
    reader.onload = () => {
      this.ImagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }
    this.postsService.AddPost(
      this.postForm.value.postHeading,
      this.postForm.value.postContent,
      this.postForm.value.image,
    );
    this.postForm.reset();
    this.router.navigate(['/admin-dashboard/view-uploads']);
  }




  // newsForm: FormGroup;
  // public imagePreview: string;

  // ngOnInit() {
  //   this.initForm();
  // }

// AddNews() {
//     this.newsService.AddNews(
//       this.newsForm.value
//       ).subscribe(data => {
//         this.newsForm.reset();
//         console.log(data);
//       }, err => {
//         console.log(err);
//       });
//     console.log(this.imagePreview);
//   }

  // private initForm() {
  //   this.newsForm = this.fb.group({
  //     newsHeading: ['', Validators.required],
  //     newsContent: ['', Validators.required],
  //   });
  // }
}
