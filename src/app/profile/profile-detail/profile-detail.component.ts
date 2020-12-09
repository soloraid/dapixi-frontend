import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SrvRecord } from 'dns';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/share/post.service';
import { Post } from 'src/app/share/post/post.module';
import { Tokens } from 'src/app/share/tokens.model';
import { environment } from "../../../environments/environment.prod"
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  userView: User;
  username: string;
  loginUser: boolean = true;
  isPresent: boolean = false;
  pictureUrl: string = "../../../assets/avatar-default.png"
  userPosts: Post[] = [];
  followers: number;
  following: number;
  isAuth: boolean = false;
  authSubs: Subscription;
  mainSubs: Subscription;
  postsSubs: Subscription;
  followsunbs: Subscription;
  pictureSubs: Subscription;
  p1 = 1;
  p = 1;
  // = {
  //   img: "https://via.placeholder.com/150",
  //   name: "علی قیومی",
  //   username: "@a",
  //   email: "a@a.com"
  // }
  copied: boolean = false;
  link: string;
  constructor(
    public http: HttpClient,
    private _profile: ProfileService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.link = window.location.href;
    this._rout.params.subscribe(() => {
      this.username = this._rout.snapshot.params['username'];
      if (this.username) {
        this.loginUser = false;
        if (this._authService.authState.value && this.username === this._authService.authState.value.username) {
          console.log(this._authService.authState.value.username);
          this._router.navigate(['/user/profile']);
        }
      }
    })
    this.authSubs = this._authService.authState.subscribe((data: Tokens) => {
      if (data) {
        this.isAuth = true;
        this.getCount(this.username);
      }
    })
    let getObv: Observable<any>;
    if (this.loginUser) {
      getObv = this._profile.getProfile();
      // this._profile.getProfile().subscribe((user: User) => {
      //   this.userView = user;
      // const index = this.link.indexOf('profile');
      // this.link = this.link.slice(0, index) + this.userView.username;
      //   this.isPresent = true;
      //   this.getPosts();
      //   this.getCount();
      // })
    } else {
      getObv = this._profile.getProfileByUsername(this.username);
      // this._profile.getProfileByUsername(this.username).subscribe((user: User) => {
      //   this.userView = user;
      //   this.isPresent = true;
      //   this.getPosts();
      //   this.getCount(this.username);

      // })
    }
    this.mainSubs = getObv.subscribe((user: User) => {
      this.userView = user;
      this.isPresent = true;
      this.getPosts();
      this.getPicture();
      if (this.loginUser) {
        const index = this.link.indexOf('profile');
        this.link = this.link.slice(0, index) + this.userView.username;
        // this.getCount();

      }
    })
    //this.getPosts();

  }
  private getPosts() {
    this.postsSubs = this._postService.getPostsByUsername(this.userView.username).subscribe((posts: Post[]) => {
      // console.log(posts)
      this.userPosts = posts;
      this.userPosts.reverse();
      //console.log(posts);
    })
  }
  private getCount(username: string = "") {
    console.log(username);
    this.followsunbs = this._profile.getFollowers(username)
      .pipe(
        map((followersCount: number) => {
          return { followers: followersCount }
        }),
        mergeMap(followerObj => {
          return this._profile.getFollowing(username)
            .pipe(
              map((followingCount: number) => {
                return {
                  following: followingCount,
                  followers: followerObj.followers
                };
              })
            )
        })
      )
      .subscribe(data => {
        //console.log(data);
        this.followers = data.followers;
        this.following = data.following;
      });
    // this.followsunbs=this._profile.getFollowing()
    // .subscribe(data=>console.log(data));
  }
  private getPicture() {
    this.pictureSubs = this._profile.getProfilePic(this.userView.username)
      .subscribe(
        (picData: PictureData) => {
          this.pictureUrl = environment.api + "/photo/" + picData.imageUrl;
        },
        (errorData: HttpErrorResponse) => {
          this.pictureUrl = "../../../assets/avatar-default.png"
        }
      );
  }
  copyLink() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
  // onBtnClick() {
  //   if (this.loginUser) {
  //     this._router.navigate(['edit'], { relativeTo: this._rout })
  //   }
  // }

}
interface User {
  username: string,
  firstName: string,
  lastName: string,
  mobile?: string,
  email?: string,
  birthDate: string
}
interface PictureData {
  username: string,
  imageUrl: string
}
