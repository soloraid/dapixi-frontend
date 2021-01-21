import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../share/post/post.module';
import {environment} from '../../environments/environment';
import {PostService} from '../share/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../share/loader/loader.service';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../share/tokens.model';
import {Subscription} from 'rxjs';
import {ProfileService} from '../profile/profile.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../share/confirm-dialog/confirm-dialog.component';
import { FullPictureComponent } from '../share/full-picture/full-picture.component';
import {Collection} from '../profile/collections/Collection.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar/snack-bar-config';
import {NewCollectionComponent} from '../profile/collections/new-collection/new-collection.component';

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
  subs:Subscription[]=[];
  isAuth: boolean;
  isFirst = true;
  rateError = '';
  username: string;
  currentUser: boolean;
  map: Map<string, number> = new Map<string, number>();
  usersProfPic: PictureData[] = [];
  collections: Collection[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private picData: PictureData;
  private errMessage = '';
  private actMessage = 'x';
  private showDialogSubs: Subscription;

  constructor(private postService: PostService, private route: ActivatedRoute,
              public loaderService: LoaderService, private authService: AuthService,
              private profileService: ProfileService,
              public dialog: MatDialog,
              public router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let authSub : Subscription = this.authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
      if (token) {
        this.username = token.username;
      }
    });
    this.subs.push(authSub);
    this.id = this.route.snapshot.params.id;
    let postSubs:Subscription = this.postService.getPostByID(this.id).subscribe((post: Post) => {
      this.postUrl = environment.api + '/photo' + post.imageUrl;
      this.post = post;
      if(this.isAuth){
        this.currentUser = post.username===this.username;
      }
      this.isEmpty = false;
      this.isFirst = false;
      let userRateSubs:Subscription = this.postService.getUsersRatePost(this.id).subscribe( users => {
        // tslint:disable-next-line:forin
        for (const member in users) {
          this.map.set(member, users[member]);
        }
        this.numUsersRate = this.map.size;
        this.getUsersRated();
      });
      this.subs.push(userRateSubs);
    });
    this.subs.push(postSubs);
  }

  setRating(rate: string): void {
    if (this.authService.isInLocal()) {
      this.id = this.route.snapshot.params.id;
      let putRateSubs :Subscription =  this.postService.putRate(this.id, rate).subscribe(() => {
        let postSubs2:Subscription = this.postService.getPostByID(this.id).subscribe((post: Post) => {
          this.post = post;
        });
        this.subs.push(postSubs2);
        let userRateSubs2 = this.postService.getUsersRatePost(this.id).subscribe( (users) => {
          this.map.clear();
          for (const member in users) {
            this.map.set(member, users[member]);
          }
          this.numUsersRate = this.map.size;
        });
        this.subs.push(userRateSubs2);
        this.getUsersRated();
      });
      this.subs.push(putRateSubs);
      this.rateError = '';
    } else {
      this.rateError = 'برای ثبت امتیاز باید وارد حساب کاربری خود شوید';
    }
  }

  deleteRating(): void {
    if (this.authService.isInLocal()) {
      this.id = this.route.snapshot.params.id;
      let deleteRateSubs:Subscription = this.postService.deleteRate(this.id).subscribe(() => {
        let postSubs3:Subscription = this.postService.getPostByID(this.id).subscribe((post: Post) => {
          this.post = post;
        });
        this.subs.push(postSubs3);
        let userRateSubs3:Subscription = this.postService.getUsersRatePost(this.id).subscribe( (users) => {
          // tslint:disable-next-line:forin
          this.map.clear();
          for (const member in users) {
            this.map.set(member, users[member]);
          }
          this.numUsersRate = this.map.size;
        });
        this.subs.push(userRateSubs3);
        this.getUsersRated();
      });
      this.subs.push(deleteRateSubs);
      this.rateError = '';

    } else {
      this.rateError = 'برای حذف امتیاز باید وارد حساب کاربری خود شوید';
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub:Subscription)=>{
      sub && sub.unsubscribe();
    })
  }

  getUsersRated(): void {
    // tslint:disable-next-line:forin
    this.usersProfPic = [];
    for ( const username of this.map.keys()) {
      let pictureSubs :Subscription = this.profileService.getProfilePic(username)
        .subscribe(
          (picData: PictureData) => {
            this.picData = new PictureData();
            if (picData.imageUrl.startsWith('/files')) {
              this.picData.imageUrl = environment.api + '/photo/' + picData.imageUrl;
            } else {
              this.picData.imageUrl = picData.imageUrl;
            }
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
        this.subs.push(pictureSubs);
    }
    if (this.usersProfPic) {
      
    }
  }
  showDialog(){
    const dialogRef=this.dialog.open(ConfirmDialogComponent);
    let showDialogSubs:Subscription = dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deletePost();
      }
    });
    this.subs.push(showDialogSubs);
  }
  showPicture(){
    
    const baseWidt=document.documentElement.clientWidth;
    const padding=(15*baseWidt)/screen.width;
    const dialogRef=this.dialog.open(FullPictureComponent,
      {
      maxWidth: baseWidt - padding,
      maxHeight: document.documentElement.clientHeight - 15
      // height: "680px"
    }
    );
    dialogRef.componentInstance.src=this.postUrl;
  }
  private deletePost(){

    let deletePostSubs:Subscription = this.postService.deletePost(this.post.id).subscribe(data=>{
      this.router.navigate(['/user/profile']);

    });
    this.subs.push(deletePostSubs);
  }

  getCollections(): void {
    if (this.authService.isInLocal()) {
      let subsCollections: Subscription = this.profileService.getCollections().subscribe((collections: Collection[]) => {
        this.collections = [];
        this.collections = collections.reverse();
      });
      this.subs.push(subsCollections);
    } else {
      this.rateError = 'برای مشاهده کلکسیون ها باید وارد حساب کاربری خود شوید';
    }
  }

  addToCollection(collection: Collection): void {
    if (this.authService.isInLocal()) {
      const subsAdd: Subscription = this.profileService.addPhotoToCollection(collection.id, this.id).subscribe( () => {
        this.errMessage =   ' عکس به کلکسیون '  + collection.title + ' اضافه شد. ';
        this.openSnackBar();
      }, (err: HttpErrorResponse) => {
        this.errMessage =  ' عکس قبلا در کلکسیون '  + collection.title +  ' اضافه شده است. ';
        this.openSnackBar();
      });
      this.subs.push(subsAdd);
    } else {
      this.rateError = 'برای اضافه کردن به کلکسیون ها باید وارد حساب کاربری خود شوید';
    }
  }

  private openSnackBar(): void {
    this.snackBar.open(this.errMessage, this.actMessage, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      direction: 'rtl',
    });
  }

  createCollection(): void {
    const dialogRef = this.dialog.open(NewCollectionComponent);
    this.showDialogSubs = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let createTitle = '';
        createTitle = result;
        this.profileService.createCollection(createTitle).subscribe( () => {
          this.profileService.getCollections().subscribe((collections: Collection[]) => {
            this.collections = [];
            this.collections = collections.reverse();
            this.addToCollection(this.collections[0]);
            this.errMessage = 'کلکسیون ساخته شد و عکس به آن اضافه شد!';
            this.openSnackBar();
          });
        }, (errorData: HttpErrorResponse) => {
          this.errMessage = 'کلکسیونی به این نام موجود است دوباره تلاش کنید!';
          this.openSnackBar();
        });
      }
    });
  }
}

class PictureData {
  username: string;
  imageUrl: string;
}
