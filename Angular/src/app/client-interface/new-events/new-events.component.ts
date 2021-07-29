import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
import { NewsService } from 'src/app/admin-dashboard/news.service';
import { NewsModel, Post } from 'src/app/admin-dashboard/student';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PopupSigninComponent } from '../popup-auth/popup-signin/popup-signin.component';
import { ViewNewsComponent } from './view-news/view-news.component';
import { Subscription } from 'rxjs';


declare var $: any;
@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.css']
})
export class NewEventsComponent implements OnInit {

  // news: NewsModel[] = [];
  // Onenews: NewsModel[] = [];

  OnePost: Post[] = [];
  posts: Post[] = [];
  private PostSub: Subscription;

  constructor(
    private dialog: MatDialog,

    private nav: HeaderService,
    private postService: NewsService,
    ) { }


    ngOnInit() {
      this.GetPosts();
    }
    GetPosts() {
      this.postService.GetPosts();
      this.PostSub = this.postService.GetPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        console.log(posts);
      });
    }

    DeletePost(postId: string) {
      this.postService.DeletePost(postId);
    }


    GetOneNews(id) {
    this.postService.GetOneNews(id)
    .subscribe(data => {
      this.OnePost = data;
      console.log(data);
    },
    err => {
      console.error(err);
    });
  }

  // ngOnInit() {

  //   this.nav.show();

  //   // this.GetAllNews();
  // }

  // GetAllNews() {
  //   this.newsService.GetNews()
  //   .subscribe(data => {
  //     this.news = data;
  //     console.log(data);
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }


  // GetOneNews(id) {
  //   this.newsService.GetOneNews(id)
  //   .subscribe(data => {
  //     this.Onenews = data;
  //     console.log(data);
  //   },
  //   err => {
  //     console.error(err);
  //   });
  // }

  onButtonClicked() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    this.dialog.open(ViewNewsComponent, dialogConfig);
  }
}

