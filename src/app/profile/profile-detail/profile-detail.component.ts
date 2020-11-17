import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../environments/environment.prod"
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  userView: User;
  id: string;
  currnetUser: boolean = true;
  // = {
  //   img: "https://via.placeholder.com/150",
  //   name: "علی قیومی",
  //   username: "@a",
  //   email: "a@a.com"
  // }
  copied: boolean = false;
  link: string;
  constructor(public http: HttpClient, private _profile: ProfileService, private _rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.link = window.location.href;
    if(this.currnetUser){
      const index=this.link.indexOf('/profile');
      this.link=this.link.slice(0,index);
    }
    this._rout.params.subscribe(() => {
      this.id = this._rout.snapshot.params['id'];
      if (this.id) {
        this.currnetUser = false;
      }
    })
    if (this.currnetUser) {
      this._profile.getProfile().subscribe((user: User) => {
        this.userView = user;
      })
    }else{
      this._profile.getProfileById(this.id).subscribe((user:User)=>{
        this.userView=user;
      })
    }
    // this.http.get(environment.api + "/auth/user/1", {
    //   headers: new HttpHeaders({
    //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDUyNDA3ODYsInVzZXJfbmFtZSI6InNoYXlhbiIsImF1dGhvcml0aWVzIjpbIlVTRVIiLCJBRE1JTiJdLCJqdGkiOiIyNTM4ZDBkOC0yZTQ4LTQ4MTgtYWI0Yy1jMTIxMDc0MWRmMWIiLCJjbGllbnRfaWQiOiJkYXBpeGkiLCJzY29wZSI6WyJ3ZWJjbGllbnQiXX0.n1JaNIri4KzScGOsCq2n1INOdrubk88BfHXmpkdOits"
    //   })
    // }).subscribe(data=>{
    //   console.log(data)
    // })
  }
  copyLink() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }

}
interface User {
  username: string,
  firstName: string,
  lastName: string,
  mobile?: string,
  email?: string,
  birthDate: string,
  profileId?: string
}
