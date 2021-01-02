import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../share/post/post.module';
import {environment} from '../../environments/environment';
import {PostService} from '../share/post.service';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../share/loader/loader.service';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../share/tokens.model';
import {Subscription} from 'rxjs';
import {User} from '../share/user/user.mudole';
import {ProfileService} from '../profile/profile.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: Post;
  id: string;
  postUrl: string;
  isEmpty = true;
  numUsersRate: number;
  authSub: Subscription;
  isAuth: boolean;
  isFirst = true;
  rateError = '';
  username:string;
  currentUser:boolean;
  map: Map<string, number> = new Map<string, number>();
  usersProfPic: PictureData[] = [];
  private pictureSubs: Subscription;
  private picData: PictureData;

  constructor(private postService: PostService, private route: ActivatedRoute,
              public loaderService: LoaderService, private authService: AuthService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.authSub = this.authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
      if(token){
        this.username=token.username;
      }
    });
    this.id = this.route.snapshot.params.id;
    this.postService.getPostByID(this.id).subscribe((post: Post) => {
      this.postUrl = environment.api + '/photo' + post.imageUrl;
      this.post = post;
      console.log(post);
      if(this.isAuth){
        this.currentUser = post.username===this.username;
      }
      console.log(this.currentUser);
      this.isEmpty = false;
      this.isFirst = false;
      this.postService.getUsersRatePost(this.id).subscribe( users => {
        // tslint:disable-next-line:forin
        for (const member in users) {
          this.map.set(member, users[member]);
        }
        console.log(this.map.size);
        this.numUsersRate = this.map.size;
        this.getUsersRated();
      });
    });
  }

  setRating(rate: string): void {
    if (this.authService.isInLocal()){
      this.id = this.route.snapshot.params.id;
      // console.log(this.isAuth);
      this.postService.putRate(this.id, rate).subscribe(() => {
        this.postService.getPostByID(this.id).subscribe((post: Post) => {
          this.post = post;
        });
        this.postService.getUsersRatePost(this.id).subscribe( (users) => {
          // tslint:disable-next-line:forin
          this.map.clear();
          for (const member in users) {
            this.map.set(member, users[member]);
          }
          console.log(this.map.size);
          this.numUsersRate = this.map.size;
        });
        this.getUsersRated();
      });
      this.rateError = '';
    }else{
      this.rateError = 'برای ثبت امتیاز باید وارد حساب کاربری خود شوید';
    }
  }

  deleteRating(): void {
    if (this.authService.isInLocal()){
      this.id = this.route.snapshot.params.id;
      this.postService.deleteRate(this.id).subscribe(() => {
        this.postService.getPostByID(this.id).subscribe((post: Post) => {
          this.post = post;
        });
        this.postService.getUsersRatePost(this.id).subscribe( (users) => {
          // tslint:disable-next-line:forin
          this.map.clear();
          for (const member in users) {
            this.map.set(member, users[member]);
          }
          console.log(this.map.size);
          this.numUsersRate = this.map.size;
        });
        this.getUsersRated();
      });
      this.rateError = '';

    }else{
      this.rateError = 'برای حذف امتیاز باید وارد حساب کاربری خود شوید';
    }
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    if (!this.authService.isInLocal()){
      this.authService.logOut();
    }
  }

  getUsersRated(): void {
    // tslint:disable-next-line:forin
    this.usersProfPic = [];
    for ( const username of this.map.keys()) {
      this.pictureSubs = this.profileService.getProfilePic(username)
        .subscribe(
          (picData: PictureData) => {
            console.log(picData.username);
            this.picData = new PictureData();
            this.picData.imageUrl = environment.api + '/photo/' + picData.imageUrl;
            this.picData.username = picData.username;
            this.usersProfPic.push(this.picData);
          },
          (errorData: HttpErrorResponse) => {
            this.picData = new PictureData();
            this.picData.imageUrl = '../../../assets/avatar-default.png';
            this.picData.username = username;
            this.usersProfPic.push(this.picData);
          }
        );
    }
    if (this.usersProfPic) {
      console.log(this.usersProfPic);
    }
  }
}

class PictureData {
  username: string;
  imageUrl: string;
}
