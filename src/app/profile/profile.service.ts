import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http:HttpClient) { }
  getProfile(){
    return this._http.get(environment.api+'/auth/user/profile');
  }
  getProfileByUsername(username:string){
    return this._http.get(environment.api+'/auth/user/'+username);
  }
}
