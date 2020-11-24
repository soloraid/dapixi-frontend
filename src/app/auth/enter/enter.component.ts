import { NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  loginSubs:Subscription;
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    console.log(form);
    console.log(!!form.value['remember']);
    // this.loginSubs=this._authService
    //   .login(form.value.username, form.value.password)
    //   .subscribe(
    //      data => {
    //       console.log(data);
    //       this._router.navigate(['/'])
    //     },
    //     (errorData: string) => {
    //       console.log(errorData);
    //       this.errorMsg = errorData;
    //       setTimeout(()=>{
    //         this.errorMsg="";
    //       },3000)
    //     }
    //   )
  }
  ngOnDestroy(){
    if(this.loginSubs){

      this.loginSubs.unsubscribe();
    }
  }
}
