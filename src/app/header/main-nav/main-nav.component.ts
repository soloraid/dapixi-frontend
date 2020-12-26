import {Component, NgZone} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {Tokens} from '../../share/tokens.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss',]
})
export class MainNavComponent {
  isAuth: boolean;
  authSubsc: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  // tslint:disable-next-line:variable-name
  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService,private _router:Router) {
  }


  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
  }

  onLogOut() {
    console.log(this._router.url);
    this._authService.logOut();
    const url=this._router.url;
    const guardedPages:string[]=[
      '/follow',
      '/recommend',
      '/hot',
      '/user/profile',
      '/user/profile/edit'
    ];
    const inGuarded=guardedPages.find((rout:string)=>{
      return rout===url;
    })
    if(inGuarded){
      this._router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.authSubsc.unsubscribe();
  }
}
