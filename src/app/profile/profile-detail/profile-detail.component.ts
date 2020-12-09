import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../environments/environment.prod"
import { ProfileService } from '../profile.service';
import {LoaderService} from '../../share/loader/loader.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  userView: User;
  username: string;
  currnetUser: boolean = true;
  // = {
  //   img: "https://via.placeholder.com/150",
  //   name: "علی قیومی",
  //   username: "@a",
  //   email: "a@a.com"
  // }
  copied: boolean = false;
  link: string;
  constructor(public http: HttpClient, private _profile: ProfileService,
              private _rout: ActivatedRoute,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.link = window.location.href;
    this._rout.params.subscribe(() => {
      this.username = this._rout.snapshot.params['username'];
      if (this.username) {
        this.currnetUser = false;
      }
    })
    if (this.currnetUser) {
      this._profile.getProfile().subscribe((user: User) => {
        this.userView = user;
        const index=this.link.indexOf('profile');
        this.link=this.link.slice(0,index)+this.userView.username;
      })
    }else{
      this._profile.getProfileByUsername(this.username).subscribe((user:User)=>{
        this.userView=user;
      })
    }

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
  birthDate: string
}
