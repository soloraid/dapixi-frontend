import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {Tokens} from '../../share/tokens.model';
import {Router} from '@angular/router';
import {ProfileService} from '../../profile/profile.service';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss',]
})
export class MainNavComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  imageUrl: string;
  authSubsc: Subscription;
  pictureSubs: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
  isHandset$2: Observable<boolean> = this.breakpointObserver.observe('(max-width: 689px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  // tslint:disable-next-line:variable-name
  private username: string;

  constructor(private breakpointObserver: BreakpointObserver,
              private _authService: AuthService,
              private _router: Router,
              private profileService: ProfileService) {
  }


  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
      if (this.isAuth) {
        this.username = token.username;
        this.getProfilePic();
      }
    });
    this.profileService.picSub.subscribe((isChange: boolean) => {
      if (isChange) {
        this.getProfilePic();
      }
    });
  }

  private getProfilePic(): void {
    this.pictureSubs = this.profileService.getProfilePic(this.username)
      .subscribe(
        (picData: PictureData) => {
          if (picData.imageUrl.startsWith('/files')) {
            this.imageUrl = environment.api + '/photo/' + picData.imageUrl;
          } else {
            this.imageUrl = picData.imageUrl;
          }
          this.profileService.picSub.next(true);
        },
        (errorData: HttpErrorResponse) => {
          this.imageUrl = '../../../assets/avatar-default.png';
        }
      );
  }

  onLogOut() {
    console.log(this._router.url);
    this._authService.logOut();
    const url = this._router.url;
    const guardedPages: string[] = [
      '/follow',
      '/recommend',
      '/hot',
      '/user/profile',
      '/user/profile/edit',
      '/user/new',
    ];
    const inGuarded = guardedPages.find((rout: string) => {
      return rout === url;
    });
    if (inGuarded || url.endsWith('following-follower')) {
      this._router.navigate(['/home']);
    }
  }

  onAuth(): void {
    this._router.navigate(['/auth'], {queryParams: {back: this._router.url}});
  }

  ngOnDestroy(): void {
    this.authSubsc.unsubscribe();
    this.pictureSubs.unsubscribe();
  }

  onRegister(): void {
    this._router.navigate(['/auth/register'], {queryParams: {back: this._router.url}});
  }
}

interface PictureData {
  username: string;
  imageUrl: string;
}
