import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Tokens } from '../share/tokens.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private _authService:AuthService) { }
  isAuth:boolean;
  authSubsc:Subscription
  ngOnInit(): void {
    this.authSubsc=this._authService.authState.subscribe((token:Tokens)=>{
      this.isAuth= !!token;
    })
  }
  onLogOut(){
    this._authService.logOut();
  }
  ngOnDestroy(){
    this.authSubsc.unsubscribe();
  }

}
