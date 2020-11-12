import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsicToken="ZGFwaXhpOnRoaXNpc3NlY3JldA==";
  constructor(private _http:HttpClient) {
   }
   login(){
    this._http.post(
      environment.api+"/auth/oauth/token",
      {
        grant_type:"password",
        scope:"webclient",
        username:"shayan",
        password:"password"

      },
      {
        headers:new HttpHeaders({
          Authorization:"Basic "+this.bsicToken
        })
      }
      ).subscribe(data=>{
        console.log(data);
      })
   }
   signIn(){
     this._http.post(
       environment.api+'/auth/user',
       {
        username: "tset1",
        firstName: "test1",
        lastName: "t1",
        password:"123456",
        mobile: "09374949025",
        email: "aliq@gmail.com",
        birthDate: "2000-02-04"
       }).subscribe(data=>{
         console.log(data);
       })
   }
}
