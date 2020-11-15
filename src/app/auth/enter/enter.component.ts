import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {

  constructor(private _authService: AuthService,private _router:Router) { }
  errorMsg: string = "";
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    // console.log(form);
    this._authService
      .login(form.value.username, form.value.password)
      .subscribe(
         data => {
          console.log(data);
          this._router.navigate(['/'])
        },
        (errorData: string) => {
          console.log(errorData);
          this.errorMsg = errorData;
          setTimeout(()=>{
            this.errorMsg="";
          },3000)
        }
      )
  }

}
