import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  picSub: Subject<boolean> = new Subject<boolean>();
  followSub: Subject<boolean> = new Subject<boolean>();

  constructor(private _http: HttpClient, private _router: Router) { }
  getProfile() {
    return this._http.get(environment.api + '/user/profile');
  }
  getProfileByUsername(username: string) {
    return this._http.get(environment.api + '/user/u/' + username)
      .pipe(catchError((errData: HttpErrorResponse) => {
        console.log(errData);
        if (errData.status == 404) {
          this._router.navigate(['/404']);
        }
        return throwError(errData);
      }));
  }
  getFollowersCount(username: string = '') {
    let params = new HttpParams();
    if (username.length) {
      // console.log(username);
      params = params.append('username', username);
      console.log('r', params);
    }
    return this._http.get(environment.api + '/user/profile/followers/count', {
      params
    });
  }

  getFollowers(username: string = '') {
    let params = new HttpParams();
    if (username.length) {
      // console.log(username);
      params = params.append('username', username);
      return this._http.get( environment.api + '/user/profile/followers', {
        params
      });
    }
  }

  getFollowings(username: string = '') {
    let params = new HttpParams();
    if (username.length) {
      // console.log(username);
      params = params.append('username', username);
      return this._http.get( environment.api + '/user/profile/followed-users', {
        params
      });
    }
  }

  getFollowingCount(username: string = '') {
    let params = new HttpParams();
    if (username.length) {
      //  console.log('du',username);
      params = params.append('username', username);
      // console.log('d',params)
    }
    return this._http.get(environment.api + '/user/profile/followed-users/count', {
      params
    });
  }
  getProfilePic(username: string){
    let params = new HttpParams();
    params = params.append('username', username);
    return this._http.get(environment.api + '/photo/profile/picture', {
      params
    });

  }

  follow(username: string) {
    // @ts-ignore
    return this._http.post( environment.api + '/user/u/' + username + '/follow');
  }

  unfollow(username: string) {
    // @ts-ignore
    return this._http.post( environment.api + '/user/u/' + username + '/unfollow');
  }

  isFollowedUser(username: string) {
    return this._http.get(environment.api + '/user/u/' + username + '/followed');
  }

  editProfileFirstLastName(firstName: string, lastName: string) {
    let params = new HttpParams();
    // console.log(firstName);
    if (firstName !== '') {
      params=params.append('firstName', firstName);
    }
    if (lastName !== '') {
      params=params.append('lastName',lastName);
    }
    console.log(params);
    return this._http.patch(environment.api + '/user/profile','',{
      params:params
    });
  }

  editProfileEmail(email: string) {
    let param = new HttpParams();
    param=param.append('email', email);
    return this._http.patch(environment.api + '/user/profile/email' ,'',{
      params:param
    })
    .pipe(
      catchError((errorData:HttpErrorResponse)=>{
        console.log(errorData);
        if(errorData.status===400){
          if(errorData.error && errorData.error.message){
            console.log(errorData.error.message);
            if(errorData.error.message===`Email: ${email} has been used.`){
              return throwError('کاربری با این ایمیل وجود دارد');
            }else{
              return throwError('خطای نامشحص در تغییر ایمیل');
            }
          }
        }
      })
    )
    ;
  }

  editProfilePhone(phoneNumber: string) {
    let param = new HttpParams();
    param=param.append('mobile', phoneNumber);
    return this._http.patch(environment.api + '/user/profile/mobile','', {
      params:param
    })
    .pipe(
      catchError((errorData:HttpErrorResponse)=>{
        console.log(errorData);
        if(errorData.status===400){
          if(errorData.error && errorData.error.message){
            console.log(errorData.error.message);
            if(errorData.error.message===`Mobile: ${phoneNumber} has been used.`){
              return throwError('کاربری با این شماره مبایل وجود دارد');
            }else{
              return throwError('خطای نامشحص در تغییر شماره مبایل');
            }
          }
        }
      })
    );
  }

  editProfileDate(birthDate: string) {
    let param = new HttpParams();
    param=param.append('birthDate', birthDate);
    return this._http.patch(environment.api + '/user/profile/birth-date' , '',{
      params:param
    });
  }

  editProfilePassword(newPassword: string) {
    let param = new HttpParams();
    param=param.append('password', newPassword);
    return this._http.patch(environment.api + '/user/profile/credentials' ,'',{
      params:param
    });

  }
}
