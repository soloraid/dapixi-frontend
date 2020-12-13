import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {LoaderService} from '../../share/loader/loader.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm:FormGroup;
  passwordHolder:string='';
  confirm:boolean=false;
  subs:Subscription;
  errMsg:string="";
  constructor(public loaderService: LoaderService,private _authService:AuthService) { }

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email])
    })
  }
  onSubmit(){
    console.log(this.resetForm.get('email').value);
    this.subs=this._authService.forgetPassword(this.resetForm.get('email').value)
    .subscribe(data=>{
      console.log(data);
      this.confirm=true;
    },
    (errorData:string)=>{
      console.log('t',errorData);
      this.errMsg=errorData;
    }
    )
  }

}
