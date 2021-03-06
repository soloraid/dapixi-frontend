import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Tokens } from '../share/tokens.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsicToken = "ZGFwaXhpOnRoaXNpc3NlY3JldA==";
  authState = new BehaviorSubject<Tokens>(null);
  confirmation=new BehaviorSubject<string>(null);
  logOutTimer;
  constructor(private _http: HttpClient,private _router:Router,private _rout:ActivatedRoute) {
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
        const token = new Tokens(data.access_token, data.refresh_token,expireDate, data.scope,username);
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
      let description
      if (errorData.error && errorData.error.message) {
        description = errorData.error.message;
      }
      let errorString: string = '';
      switch (description) {
        case `Username ${username} has already been used`:
          errorString = `کاربر با این شناسه وجود دارد`;
          break;
        case `Mobile ${mobile} has already been used!`:
          errorString = 'کاربری با این شماره همراه قبلا ثبت نام کرده‌است';
          break;
        case `Email ${email} has already been used!`:
          errorString='کاربری با این ایمیل قبلا ثبت نام کرده است'
          break;
        default:
          errorString = 'خطای نامشخص لطفا بعدا تلاش کنید';

      }
      return throwError(errorString);
    })
    )
  }
  autoLogIn(){
    const tokensTemp:{
      _access:string,
      _refresh:string,
      _expireDate:string,
      scope:string,
      username:string
    }=JSON.parse(localStorage.getItem('tokens'));
    if(tokensTemp){
      const tokens=new Tokens(tokensTemp._access,tokensTemp._refresh,new Date(tokensTemp._expireDate),tokensTemp.scope,tokensTemp.username);
      if(tokens.access){
        this.authState.next(tokens);
        const expireDuration=new Date(tokensTemp._expireDate).getTime()-new Date().getTime();
        this.autoLogOut(expireDuration);
        if(this._router.url.startsWith('/auth')){
          this._router.navigate(['home']);
        }
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
  forgetPassword(email:string){
    let params=new HttpParams();
    params=params.append('email',email);
    return this._http.post(environment.api+'/auth/user/forgot-password/','',{params:params})
    .pipe(catchError((errorData:HttpErrorResponse)=>{
      let description
      if (errorData.error && errorData.error.message) {
        description = errorData.error.message;
      }
      if (errorData.error && errorData.error.error_description) {
        description = errorData.error.error_description;
      }
      let errorString: string = '';
      switch (description) {
        case `No User with email ${email} Exists!`:
          errorString = `چنین ایمیلی ثبت نشده‌است`;
          break;
        case 'You should verify your email first - go to your email and verify':
          errorString = 'ابتدا باید ایمیل خود را تایید کنید';
          break;
        // case `Email ${email} has already been used!`:
        //   errorString='کاربری با این ایمیل قبلا ثبت نام کرده است'
        //   break;
        default:
          errorString = 'خطای نامشخص لطفا بعدا تلاش کنید';

      }
      return throwError(errorString);
    })
    )
  }
  sendMessage(title:string,message:string){
    let params=new HttpParams();
    params = params.append('title',title);
    params = params.append('content',message);
    return this._http.post(environment.api+'/auth/user/support',{},{
      params:params
    })
  }
  isInLocal(){
    const tokensTemp:{
      _access:string,
      _refresh:string,
      _expireDate:string,
      scope:string,
      username:string
    }=JSON.parse(localStorage.getItem('tokens'));
    if(tokensTemp){
      return true;
    }else{
      return false;
    }
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
