import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Tokens } from './tokens.model';

@Injectable({
  providedIn: 'root'
})
export class ReAuthGuard implements CanActivate {
  constructor(private _authService:AuthService,private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._authService.authState.pipe(
        take(1),
        map((token:Tokens)=>{
          if(!token){
            return false
          }else{
            return this._router.createUrlTree(['/']);
          }
        })
      )

  }
  
}
