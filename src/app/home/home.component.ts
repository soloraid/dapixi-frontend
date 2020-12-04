import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../share/tokens.model';
import {Post} from '../share/post/post.module';
import {PostService} from '../share/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubsc: Subscription;
  postView: Post[] = [];
  isEmpty = true;
  p = 1;
  p2 = 1;

  // tslint:disable-next-line:variable-name
  constructor(private _authService: AuthService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this.postService.getLatestPost().subscribe(posts => {
      // console.log(posts);
      // tslint:disable-next-line:forin
      for (let index in posts) {
        this.postView.push(posts[index]);
      }
      this.isEmpty = false;
    });
  }

  ngOnDestroy() {
    this.authSubsc.unsubscribe();
  }

}
