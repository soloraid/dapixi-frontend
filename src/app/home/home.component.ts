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
  postsSubs: Subscription;
  postView: Post[] = [];
  isEmpty = true;
  firstLoad:boolean=true;


  constructor(private _authService: AuthService,
              public postService: PostService,
              public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this.postsSubs = this.postService.getLatestPost(9).subscribe(posts => {
      for (const index in posts) {
        this.postView.push(posts[index]);
      }
      this.isEmpty = false;
      this.firstLoad=false;
    });
  }

  ngOnDestroy() {
    this.authSubsc.unsubscribe();
    this.postsSubs && this.postsSubs.unsubscribe();
  }

}
