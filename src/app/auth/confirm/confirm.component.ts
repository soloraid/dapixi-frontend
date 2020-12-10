import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit,OnDestroy {
  authSubs:Subscription
  constructor(private _authService:AuthService) { }
  email:string;
  ngOnInit(): void {
    this.authSubs=this._authService.confirmation.subscribe((email:string)=>{
      this.email=email;
    })
  }
  ngOnDestroy(){
    this.authSubs.unsubscribe();
  }

}
