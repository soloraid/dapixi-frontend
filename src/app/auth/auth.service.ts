import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tokens } from '../share/tokens.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsicToken = "ZGFwaXhpOnRoaXNpc3NlY3JldA==";
  authState=new BehaviorSubject<tokens>(null);
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
    ).pipe(tap((data:loginResponse)=>{
      const token=new tokens(data.access_token,data.refresh_token,data.expires_in,data.scope);
      this.authState.next(token);
      localStorage.setItem('token',JSON.stringify(token));
    }))
  }
  signIn() {
    this._http.post(
      environment.api + '/auth/user',
      {
        username: "tset1",
        firstName: "test1",
        lastName: "t1",
        password: "123456",
        mobile: "09374949025",
        email: "aliq@gmail.com",
        birthDate: "2000-02-04"
      }).subscribe(data => {
        console.log(data);
      })
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
