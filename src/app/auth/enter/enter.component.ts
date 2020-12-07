import { NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit,OnDestroy {

  constructor(private _authService: AuthService,private _router:Router) { }
  errorMsg: string = "";
  @ViewChild('enter_form',{static:false}) enterForm:NgForm;
  username:string;
  // password:String;
  hasRemember:boolean=false;
  loginSubs:Subscription;
  ngOnInit(): void {
    const username=localStorage.getItem('username');
    // const password=localStorage.getItem('password');
    if(username){
      this.username=username;
      // this.password=password;
      this.hasRemember=true;
    }
    // console.log(this.enterForm);

  }
  onSubmit() {
    console.log(this.enterForm.value);
    // console.log(!!form.value['remember']);
    const username=this.enterForm.value.username;
    const password=this.enterForm.value.password;
    this.loginSubs=this._authService
      .login(username,password)
      .subscribe(
         data => {
          console.log(data);
          if(this.enterForm.value['remember']){
            this.remember(username);
          }else{
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          this._router.navigate(['/']);
        },
        (errorData: string) => {
          console.log(errorData);
          this.errorMsg = errorData;
          // setTimeout(()=>{
          //   this.errorMsg="";
          // },5000)
        }
      )
  }
  ngOnDestroy(){
    if(this.loginSubs){

      this.loginSubs.unsubscribe();
    }
  }
  private remember(username:string){
    localStorage.setItem('username',username);
    // localStorage.setItem('password',password);
  }
}
