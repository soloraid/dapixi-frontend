import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { Tokens } from '../share/tokens.model';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private _authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._authService.authState.
    pipe(take(1),exhaustMap((tokens:Tokens)=>{
      if(tokens){
        const modified=request.clone({
          headers:new HttpHeaders({
            Authorization:'Bearer '+tokens.access
          })
        })
        return next.handle(modified);
      }else{
        return next.handle(request);
      }
    }))
  }
}
