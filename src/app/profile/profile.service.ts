import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http:HttpClient,private _router:Router) { }
  getProfile(){
    return this._http.get(environment.api+'/user/profile');
  }
  getProfileByUsername(username:string){
    return this._http.get(environment.api+'/user/'+username)
    .pipe(catchError((errData:HttpErrorResponse)=>{
      console.log(errData);
      if(errData.status==404){
        this._router.navigate(['/404']);
      }
      return throwError(errData);
    }));
  }
}
