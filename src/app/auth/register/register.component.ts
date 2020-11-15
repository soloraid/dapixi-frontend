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
  passwordHolder:string='';
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.regForm=new FormGroup({
      'firstName':new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'lastName':new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(32)]),
      'userName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(32)]),
      'phone':new FormControl('',Validators.pattern(/(09\d{9})|([+|0]989\d{9})/)),
      'date':new FormControl('',[Validators.required,this.dateValidator.bind(this)]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'passwordRep':new FormControl('',[Validators.required,Validators.minLength(6),this.passwordRepeatValidator.bind(this)])
      
    })
  } onPasswordChange(event){
    this.passwordHolder=event.target.value;
    // console.log(event.target.value);
    // console.log(this.passwordHolder);
  }
  onSubmit(){
    this._authService.signIn(
      this.regForm.get('userName').value,
      this.regForm.get('firstName').value,
      this.regForm.get('lastName').value,
      this.regForm.get('password').value,
      this.regForm.get('phone').value,
      this.regForm.get('email').value,
      this.regForm.get('date').value
    )
  }
   minError(formControlName:string){
    // console.log('v',this.regForm.controls[formControlName].errors);
    if(this.regForm.controls[formControlName].errors && this.regForm.controls[formControlName].errors['minlength']){
      if(this.regForm.controls[formControlName].errors['minlength'] && this.regForm.controls[formControlName].touched){
        return true;
      }else{
        return false;
      }
    }
  }
  private dateValidator(formControl:FormControl):{[k:string]:boolean}|null{
    const now=new Date();
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    const input=new Date(Date.parse(formControl.value+"T00:00:00.000"));
    if(input.getTime()>=today.getTime()){
      return {'today':true}
    }else{
      return null;
    }
  }
  private passwordRepeatValidator(formControl:FormControl):{[k:string]:boolean}|null{
    if(formControl.value!==this.passwordHolder){
      return {'repeat':true};
    }else{
      return null
    }
  }
}
