import {Injectable, OnInit} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';
import {Tokens} from '../share/tokens.model';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor{
  tokensTemp:{
    _access:string,
    _refresh:string,
    _expireDate:string,
    scope:string,
    username:string
  };
  constructor(private _authService: AuthService) {
    // console.log('init');
    // console.log(localStorage.getItem('tokens'));
    // this.tokensTemp=JSON.parse(localStorage.getItem('tokens'));
    // // console.log(this.tokensTemp);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return this._authService.authState.pipe(take(1), exhaustMap((tokens: Tokens) => {
    //   if (tokens) {
    //     console.log('+>>>' + tokens.access)
    //     const modified = request.clone({
    //       headers: new HttpHeaders({
    //         Authorization: 'Bearer ' + tokens.access
    //       })
    //     })
    //     return next.handle(modified);
    //   } else {
    //     return next.handle(request);
    //   }
    // }));
    // console.log(this.tokensTemp);
    this.tokensTemp=JSON.parse(localStorage.getItem('tokens'));
    if(this.tokensTemp){
      const tokens=new Tokens(this.tokensTemp._access,this.tokensTemp._refresh,new Date(this.tokensTemp._expireDate),this.tokensTemp.scope,this.tokensTemp.username);
      if(tokens.access){
        //console.log('+>>>' + tokens.access)
        const modified = request.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + tokens.access
          })
        })
        return next.handle(modified);
        
      }else{
        return next.handle(request);
      }
    }else{
      return next.handle(request);
    }
  }
}
