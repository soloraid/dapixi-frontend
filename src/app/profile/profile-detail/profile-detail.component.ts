import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  userView={
    img:"https://via.placeholder.com/150",
    name:"علی قیومی",
    username:"@a",
    email:"a@a.com"
  }
  copied:boolean=false;
  link:string;
  constructor() { }

  ngOnInit(): void {
    this.link=window.location.href;
  }
  copyLink(){
    this.copied=true;
    setTimeout(()=>{
      this.copied=false;
    },3000);
  }

}