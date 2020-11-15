import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regForm:FormGroup;
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.regForm=new FormGroup({
      'firstName':new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'lastName':new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'userName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]),
      'phone':new FormControl('',Validators.pattern(/(09\d{9})|([+|0]989\d{9})/)),
      'date':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'passwordRep':new FormControl('',[Validators.required,Validators.minLength(6)])
      
    })
  }
  onSubmit(){
    console.log(this.regForm);
    // this._authService.signIn();
  }
}
