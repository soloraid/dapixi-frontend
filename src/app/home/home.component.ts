import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tokens } from '../share/tokens.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  isAuth:boolean;
  authSubsc:Subscription
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.authSubsc=this._authService.authState.subscribe((token:tokens)=>{
      this.isAuth= !!token;
    })
  }
  ngOnDestroy(){
    this.authSubsc.unsubscribe();
  }

}
