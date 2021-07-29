import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Post } from '../student';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';
import { mimeType } from '../courses/mime-type.valiodator';
import { VideoService } from './video.service';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  postForm: FormGroup;
  ImagePreview: string;
  private postId: string;
  post: Post;

  constructor(
    private postsService: VideoService,
    private router: Router,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.initForm();
  }
  private initForm() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      video: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      }),
      Introduction: ['', Validators.required],
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({video: file});
    this.postForm.get('video').updateValueAndValidity();
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
      this.postForm.value.name,
      this.postForm.value.Introduction,
      this.postForm.value.video,
    );
    this.postForm.reset();
    // this.router.navigate(['/admin-dashboard/show-videos']);
  }


}
