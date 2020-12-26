import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../share/post/post.module';
import {environment} from '../../environments/environment';
import {PostService} from '../share/post.service';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../share/loader/loader.service';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../share/tokens.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit,OnDestroy {
  post: Post;
  id: string;
  postUrl: string;
  isEmpty = true;
  numUsersRate = 0;
  authSub: Subscription;
  isAuth: boolean;
  constructor(private postService: PostService, private route: ActivatedRoute,
              public loaderService: LoaderService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authSub = this.authService.authState.subscribe((token: Tokens) => {
      console.log(!!token);
      this.isAuth = !!token;
    });
    this.id = this.route.snapshot.params.id;
    this.postService.getPostByID(this.id).subscribe((post: Post) => {
      this.postUrl = environment.api + '/photo' + post.imageUrl;
      this.post = post;
      this.isEmpty = false;
    });
  }

  setRating(rate: string): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.isAuth);
    this.postService.putRate(this.id, rate).subscribe(() => {
      this.postService.getPostByID(this.id).subscribe((post: Post) => {
        this.post = post;
      });
      this.postService.getUsersRatePost(this.id).subscribe( users => {
        this.numUsersRate = 1;
      });
    });
  }

  deleteRating(): void {
    this.id = this.route.snapshot.params.id;
    this.postService.deleteRate(this.id).subscribe(() => {
      this.postService.getPostByID(this.id).subscribe((post: Post) => {
        this.post = post;
      });
      this.postService.getUsersRatePost(this.id).subscribe( (users) => {
        this.numUsersRate = 2;
      });
    });

  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
