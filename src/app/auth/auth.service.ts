import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { tokens } from '../share/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsicToken = "ZGFwaXhpOnRoaXNpc3NlY3JldA==";
  authState = new BehaviorSubject<tokens>(null);
  constructor(private _http: HttpClient) {
  }
  login(username: string, password: string) {
    let body: FormData = new FormData();
    body.append('grant_type', 'password');
    body.append('scope', 'webclient');
    body.append('username', username);
    body.append('password', password);
    return this._http.post(
      environment.api + "/auth/oauth/token",
      body,
      {
        headers: new HttpHeaders({
          Authorization: "Basic " + this.bsicToken
        })
      }
    ).pipe(
      catchError((errorData: HttpErrorResponse) => {
        // let errorString:string;
        // if(errorData.error.error_description==='Bad credentials'){
        //   errorString="رمز عبور و شناسه کاربری مطابقت ندارند";
        // }else if()
        let description
        if (errorData.error && errorData.error.error_description) {
          description = errorData.error.error_description;
        }
        let errorString: string = '';
        switch (description) {
          case 'Bad credentials':
            errorString = 'شناسه کابری و رمز عبور مطابقت ندارند';
            break;
          case 'No value present':
            errorString = 'کاربری با این شناسه وجود ندارد';
            break;
          default:
            errorString = 'خطای نامشخص';

        }
        return throwError(errorString);
      })
      , tap((data: loginResponse) => {
        const token = new tokens(data.access_token, data.refresh_token, data.expires_in, data.scope);
        this.authState.next(token);
        localStorage.setItem('token', JSON.stringify(token));
      })
    )
  }
  signUp(username: string, firstName: string, lastName: string, password: String, mobile: string = null, email: string, birthDate: string) {
    let body: any = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      // mobile: mobile,
      email: email,
      birthDate: birthDate
    }
    if (mobile) {
      body.mobile = mobile;
    }
    return this._http.post(
      environment.api + '/auth/user',
      body
    ).pipe(catchError((errorData:HttpErrorResponse)=>{
      return throwError("کاربر با این مشخصات وجود دارد");
    })
    )
  }
}
interface loginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}
