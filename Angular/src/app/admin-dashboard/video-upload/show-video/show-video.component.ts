import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { HeaderService } from 'src/app/header.service';
import { Subscription } from 'rxjs';
import { Video } from '../../student';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent implements OnInit {

  OneVideo: Video[] = [];
  videos: Video[] = [];
  totalvideos = 10;
  videosPerPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private PostSub: Subscription;

  constructor(

    private nav: HeaderService,
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
