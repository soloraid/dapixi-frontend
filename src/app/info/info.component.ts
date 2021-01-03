import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Tokens } from '../share/tokens.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  authSubs:Subscription;
  isAuth:boolean
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.authSubs=this._authService.authState.subscribe((token:Tokens)=>{
      this.isAuth=!!token;
    })
  }
  onSubmit(form:NgForm){
    console.log(form.value.title,form.value.message);
  }

}
