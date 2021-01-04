import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../share/loader/loader.service';
import { Tokens } from '../share/tokens.model';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit,OnDestroy {
  authSubs:Subscription;
  isAuth:boolean;
  msgSubs:Subscription;
  send:boolean=false;
  error:boolean=false;
  constructor(private _authService:AuthService,public loaderService:LoaderService) { }

  ngOnInit(): void {
    this.authSubs=this._authService.authState.subscribe((token:Tokens)=>{
      this.isAuth=!!token;
    })
  }
  onSubmit(form:NgForm){
    this.send=false;
    this.error=false;
    this.msgSubs = this._authService.sendMessage(form.value.title,form.value.message).subscribe(
      data=>{
      this.send=true;
      this.error=false;
      form.reset();
    },
    errData=>{
      this.error=true;
      this.send=false;
    })
  }
  ngOnDestroy(){
    this.msgSubs && this.msgSubs.unsubscribe();
  }

}
