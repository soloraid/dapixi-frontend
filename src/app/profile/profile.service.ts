import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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
  getFollowers(username: string = "") {
    let params = new HttpParams();
    if (username.length) {
      // console.log(username);
      params=params.append('username', username);
      console.log('r',params)
    }
    return this._http.get(environment.api + '/user/profile/followers/count', {
      params: params
    });
  }
  getFollowing(username: string = "") {
    let params = new HttpParams();
    if (username.length) {
      //  console.log('du',username);
      params=params.append('username', 'hashem');
      // console.log('d',params)
    }
    return this._http.get(environment.api + '/user/profile/followed-users/count',{
      params:params
    });
  }
}
