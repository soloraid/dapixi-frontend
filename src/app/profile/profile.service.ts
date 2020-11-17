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
  getProfileById(id:string){
    return this._http.get(environment.api+'/auth/user/'+id);
  }
      // this.http.get(environment.api + "/auth/user/1", {
    //   headers: new HttpHeaders({
    //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUyNDA3ODYsInVzZXJfbmFtZSI6InNoYXlhbiIsImF1dGhvcml0aWVzIjpbIlVTRVIiLCJBRE1JTiJdLCJqdGkiOiIyNTM4ZDBkOC0yZTQ4LTQ4MTgtYWI0Yy1jMTIxMDc0MWRmMWIiLCJjbGllbnRfaWQiOiJkYXBpeGkiLCJzY29wZSI6WyJ3ZWJjbGllbnQiXX0.n1JaNIri4KzScGOsCq2n1INOdrubk88BfHXmpkdOits"
    //   })
    // }).subscribe(data=>{
    //   console.log(data)
    // })
}
