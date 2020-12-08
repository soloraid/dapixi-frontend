import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/share/post.service';
import { Post } from 'src/app/share/post/post.module';
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
  userPosts: Post[] = [];
  postsSubs: Subscription;
  followers:number;
  following:number;
  followsunbs:Subscription
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
    private _postService:PostService
  ) { }

  ngOnInit(): void {
    this.link = window.location.href;
    this._rout.params.subscribe(() => {
      this.username = this._rout.snapshot.params['username'];
      if (this.username) {
        this.loginUser = false;
        if (this.username === this._authService.authState.value.username) {
          console.log(this._authService.authState.value.username);
          this._router.navigate(['/user/profile']);
        }
      }
    })
    if (this.loginUser) {
      this._profile.getProfile().subscribe((user: User) => {
        this.userView = user;
        const index = this.link.indexOf('profile');
        this.link = this.link.slice(0, index) + this.userView.username;
        this.isPresent = true;
        this.getPosts();
        this.getCount();
      })
    } else {
      this._profile.getProfileByUsername(this.username).subscribe((user: User) => {
        this.userView = user;
        this.isPresent = true;
        this.getPosts();
        this.getCount(this.username);

      })
    }
    //this.getPosts();

  }
  private getPosts() {
    this.postsSubs = this._postService.getPostsByUsername(this.userView.username).subscribe((posts:Post[])=>{
      // console.log(posts)
      this.userPosts=posts;
      console.log(posts);
    })
  }
  getCount(username:string=""){
    console.log(username);
    this.followsunbs=this._profile.getFollowers(username)
    .pipe(
      map((followersCount:number)=>{
        return {followers:followersCount}
      }),
      mergeMap(followerObj=>{
        return this._profile.getFollowing(username)
        .pipe(
          map((followingCount:number)=>{
            return {
              following:followingCount,
              followers:followerObj.followers
            };
          })
        )
      })
    )
    .subscribe(data=>{
      console.log(data);
      this.followers=data.followers;
      this.following=data.following;
    });
    // this.followsunbs=this._profile.getFollowing()
    // .subscribe(data=>console.log(data));
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
