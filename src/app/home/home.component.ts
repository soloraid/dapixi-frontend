import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../share/tokens.model';
import {Post} from '../share/post/post.module';
import {PostService} from '../share/post.service';
import {LoaderService} from '../share/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubsc: Subscription;
  postView: Post[] = [];
  followedPosts: Post[] = [];
  highRatedPosts: Post[] = [];
  isEmpty = true;
  isFollowed = false;
  isHighRated = false;
  p = 1;


  constructor(private _authService: AuthService,
              private postService: PostService,
              public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this.postService.getLatestPost(9).subscribe(posts => {
      // console.log(posts);
      // tslint:disable-next-line:forin
      for (const index in posts) {
        this.postView.push(posts[index]);
      }
      this.isEmpty = false;
    });
    if (this.isAuth) {
      this.postService.getFollowedPost(9).subscribe(posts => {
        // tslint:disable-next-line:forin
        for (const index in posts) {
          this.followedPosts.push(posts[index]);
        }
        if (this.followedPosts.length > 0) {
          this.isFollowed = true;
        } else {
          this.isFollowed = false;
        }
      });
    }

    this.postService.getHighRatedPost(9).subscribe(posts => {
      // tslint:disable-next-line:forin
      for (const index in posts) {
        this.highRatedPosts.push(posts[index]);
      }
      if (this.highRatedPosts.length > 0) {
        this.isHighRated = true;
      } else {
        this.isHighRated = false;
      }
    });

  }

  ngOnDestroy() {
    this.authSubsc.unsubscribe();
  }

}
