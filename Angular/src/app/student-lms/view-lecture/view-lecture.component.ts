import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/admin-dashboard/student';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/header.service';
import { VideoService } from 'src/app/admin-dashboard/video-upload/video.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-view-lecture',
  templateUrl: './view-lecture.component.html',
  styleUrls: ['./view-lecture.component.css']
})
export class ViewLectureComponent implements OnInit {


  OneVideo: Video[] = [];
  videos: Video[] = [];
  totalvideos = 10;
  videosPerPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private PostSub: Subscription;

  constructor(
    private postService: VideoService,
    ) { }


    ngOnInit() {
      this.GetPosts();
    }
    GetPosts() {
      this.postService.GetPosts();
      this.PostSub = this.postService.GetPostsUpdatedListener()
      .subscribe((videos: Video[]) => {
        this.videos = videos;
        console.log(videos);
      });
    }

    onPageChanged(pageData: PageEvent) {
      console.log(pageData);
    }

    DeletePost(postId: string) {
      this.postService.DeletePost(postId);
    }


    GetOneNews(id) {
    this.postService.GetOneVideo(id)
    .subscribe(data => {
      this.OneVideo = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }



  onButtonClicked() {
  }

}
