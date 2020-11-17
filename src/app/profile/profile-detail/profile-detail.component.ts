import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment.prod"
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  userView = {
    img: "https://via.placeholder.com/150",
    name: "علی قیومی",
    username: "@a",
    email: "a@a.com"
  }
  copied: boolean = false;
  link: string;
  constructor(public http: HttpClient,private _profile:ProfileService) { }

  ngOnInit(): void {
    this.link = window.location.href;
    this._profile.getProfile().subscribe((data)=>{
      console.log(data);
    })
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
interface User{
  username:string,
  firstName: string,
  lastName: string,
  mobile: string,
  email: string,
  birthDate: string,
  profileId: string
}
