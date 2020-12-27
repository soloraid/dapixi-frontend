import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor(private _router:Router,private _authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status===401) {
          const url=this._router.url;
          if(!url.startsWith('/post-detail') && 
          !(url.startsWith('/user') && !url.startsWith('/user/profile'))
          ){
            console.log('here');
            if(!url.startsWith('/auth')){
              this._authService.logOut();
              this._router.navigate(['/auth'],{queryParams:{error:true}});
            }else{
              this._router.navigate(['/home']);
            }
          }
        }
        else if(error.status===500){
          this._router.navigate(['/500']);
        }
        // else {
        //   console.log('this is server side error');
        //   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        // }
        // console.log(errorMsg);
        return throwError(error);
      })
    )
  }
}
