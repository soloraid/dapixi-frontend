import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {PostService} from 'src/app/share/post.service';
import {Post} from 'src/app/share/post/post.module';
import {Tokens} from 'src/app/share/tokens.model';
import {environment} from '../../../environments/environment.prod';
import {ProfileService} from '../profile.service';
import {LoaderService} from '../../share/loader/loader.service';
import {User} from '../../share/user/user.mudole';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  @ViewChild('inputFile', {static: false})
  InputVar: ElementRef;
  userView: User;
  username: string;
  loginUser = true;
  isPresent = false;
  pictureUrl = '../../../assets/avatar-default.png';
  userPosts: Post[] = [];
  followers: number;
  following: number;
  isFollowed: boolean;
  postsPresent = false;
  isAuth = false;
  selectedFile: File = null;
  authSubs: Subscription;
  mainSubs: Subscription;
  postsSubs: Subscription;
  followsunbs: Subscription;
  pictureSubs: Subscription;
  notifSubs: Subscription;
  deletPicSubs:Subscription;
  authError = '';
  p1 = 1;
  p = 1;
  copied = false;
  link: string;
  isNotifON = false;

  constructor(
    public http: HttpClient,
    private _profile: ProfileService,
    private _rout: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _postService: PostService,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.link = window.location.href;
    this._rout.params.subscribe(() => {
      this.username = this._rout.snapshot.params.username;
      if (this.username) {
        this.loginUser = false;
        if (this._authService.authState.value && this.username === this._authService.authState.value.username) {
          this.loginUser = true;
        }
      }
    });
    this.authSubs = this._authService.authState.subscribe((data: Tokens) => {
      if (data) {
        this.isAuth = true;
        this.getCount(this.username);
      } else {
        this.isAuth = false;
      }
    });
    let getObv: Observable<any>;
    if (this.loginUser) {
      getObv = this._profile.getProfile();

    } else {
      getObv = this._profile.getProfileByUsername(this.username);

    }
    this.mainSubs = getObv.subscribe((user: User) => {
      this.userView = user;
      this._profile.isFollowedUser(user.username).subscribe((data: boolean) => {
        this.isFollowed = data;
      });
      this.isPresent = true;
      this.getPosts();
      this.getPicture();
      if (this.loginUser) {
        const index = this.link.indexOf('profile');
        this.link = this.link.slice(0, index) + this.userView.username;

      }
    });

    this.notification();
  }

  private getPosts() {
    this.postsSubs = this._postService.getPostsByUsername(this.userView.username, 9).subscribe((posts: Post[]) => {
      this.userPosts = posts;
      this.postsPresent = true;
    });
  }

  private getCount(username: string = ''): void {
    this.followsunbs = this._profile.getFollowersCount(username)
      .pipe(
        map((followersCount: number) => {
          return {followers: followersCount};
        }),
        mergeMap(followerObj => {
          return this._profile.getFollowingCount(username)
            .pipe(
              map((followingCount: number) => {
                return {
                  following: followingCount,
                  followers: followerObj.followers
                };
              })
            );
        })
      )
      .subscribe(data => {
        this.followers = data.followers;
        this.following = data.following;
      });

  }

  private getPicture(): void {
    this.pictureSubs = this._profile.getProfilePic(this.userView.username)
      .subscribe(
        (picData: PictureData) => {
          if (picData.imageUrl.startsWith('/files')) {
            this.pictureUrl = environment.api + '/photo/' + picData.imageUrl;
          } else {
            this.pictureUrl = picData.imageUrl;
          }
        },
        (errorData: HttpErrorResponse) => {
          this.pictureUrl = '../../../assets/avatar-default.png';
        }
      );
  }

  copyLink() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }

  ngOnDestroy(): void {

    if (this.authSubs) {
      this.authSubs.unsubscribe();
    }
    if (this.mainSubs) {
      this.mainSubs.unsubscribe();
    }
    if (this.postsSubs) {
      this.postsSubs.unsubscribe();
    }
    if (this.pictureSubs) {
      this.pictureSubs.unsubscribe();
    }
    if (this.followsunbs) {
      this.followsunbs.unsubscribe();
    }
    if (!this._authService.isInLocal()) {
      this._authService.logOut();
    }
    if (this.notifSubs) {
      this.notifSubs.unsubscribe();
    }
    if(this.deletPicSubs){
      this.deletPicSubs.unsubscribe();
    }
  }

  requestToFollow(): void {
    if (this._authService.isInLocal()) {
      this._profile.follow(this.userView.username).subscribe(() => {
        this.getCount(this.userView.username);
        this.isFollowed = true;
        this._profile.followSub.next(true);
      });
    } else {
      this.authError = 'باید وارد حساب کاربری خود شوید';
    }
  }

  requestToUnfollow(): void {
    if (this._authService.isInLocal()) {
      this._profile.unfollow(this.userView.username).subscribe(() => {
        this.getCount(this.userView.username);
        this.isFollowed = false;
        this._profile.followSub.next(true);
        this._profile.setNotification(false).subscribe((isNotif: boolean) => {
          this.isNotifON = isNotif;
        });
      });
    } else {
      this.authError = 'باید وارد حساب کاربری خود شوید';
    }
  }

  onChange(event): void {
    this.selectedFile = (event.target.files[0] as File);
    this._postService.uploadProfilePhoto(this.selectedFile).subscribe(() => {
      this.getPicture();
      this._profile.picSub.next(true);
      this.InputVar.nativeElement.value = '';
    });
  }

  navigate(): void {
    this._router.navigate(['user', this.userView.username, 'following-follower']);
  }

  deletePic(): void {
    this.deletPicSubs = this._profile.deleteProfilePic().subscribe(() => {
      this.getPicture();
      this._profile.picSub.next(true);
    });
  }

  private notification(): void {
    let observe: Observable<any>;
    observe = this._profile.getCurrentStatusNotification();
    this.notifSubs = observe.subscribe((isNotif: boolean) => {
      this.isNotifON = isNotif;
    });
  }

  changeNotification(): void {
    this.notification();
    this.notifSubs = this._profile.setNotification(!this.isNotifON).subscribe((isNotif: boolean) => {
      this.isNotifON = isNotif;
    });
  }

  navigateToCollections(): void {
    this._router.navigate(['user/profile/collections']);
  }
}

interface PictureData {
  username: string;
  imageUrl: string;
}
