import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Tokens } from '../share/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsicToken = "ZGFwaXhpOnRoaXNpc3NlY3JldA==";
  authState = new BehaviorSubject<Tokens>(null);
  logOutTimer;
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
        const expireDuration=data.expires_in*1000;
        const expireDate=new Date(new Date().getTime()+expireDuration);
        this.autoLogOut(expireDuration);
        const token = new Tokens(data.access_token, data.refresh_token,expireDate, data.scope);
        this.authState.next(token);
        localStorage.setItem('tokens', JSON.stringify(token));
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
      return throwError("خطا: کاربر با این مشخصات وجود دارد یا خطایی رخ داده‌است");
    })
    )
  }
  autoLogIn(){
    const tokensTemp:{
      _access:string,
      _refresh:string,
      _expireDate:string,
      scope:string
    }=JSON.parse(localStorage.getItem('tokens'));
    if(tokensTemp){
      const tokens=new Tokens(tokensTemp._access,tokensTemp._refresh,new Date(tokensTemp._expireDate),tokensTemp.scope);
      if(tokens.access){
        this.authState.next(tokens);
        const expireDuration=new Date(tokensTemp._expireDate).getTime()-new Date().getTime();
        this.autoLogOut(expireDuration);
      }else{
        localStorage.removeItem('tokens');
      }
    }
  }
  logOut(){
    this.authState.next(null);
    localStorage.removeItem('tokens');
    if(this.logOutTimer){
      clearTimeout(this.logOutTimer);
    }
  }
  private autoLogOut(expireDuration:number){
    this.logOutTimer=setTimeout(()=>{
      this.logOut();
    },expireDuration)
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
