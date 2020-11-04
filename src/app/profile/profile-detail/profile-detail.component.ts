import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
