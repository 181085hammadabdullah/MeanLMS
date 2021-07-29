import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ViewNewsComponent } from 'src/app/client-interface/new-events/view-news/view-news.component';
import { Post } from '../../student';
import { NewsService } from '../../news.service';
import { HeaderService } from 'src/app/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent implements OnInit {

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
