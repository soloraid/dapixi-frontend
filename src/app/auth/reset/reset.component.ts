import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm:FormGroup;
  passwordHolder:string='';
  constructor() { }

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      'password':new FormControl('',[Validators.required,Validators.minLength(6)]),
      'passwordRep':new FormControl('',[Validators.required,Validators.minLength(6),this.passwordRepeatValidator.bind(this)])
    })
  }
  onPasswordChange(event){
    this.passwordHolder=event.target.value;
    // console.log(event.target.value);
    // console.log(this.passwordHolder);
  }
  minError(formControlName:string){
    // console.log('v',this.resetForm.controls[formControlName].errors);
    if(this.resetForm.controls[formControlName].errors && this.resetForm.controls[formControlName].errors['minlength']){
      if(this.resetForm.controls[formControlName].errors['minlength'] && this.resetForm.controls[formControlName].touched){
        return true;
      }else{
        return false;
      }
    }
  }
  onSubmit(){
    console.log(this.resetForm);
  }
  private passwordRepeatValidator(formControl:FormControl):{[k:string]:boolean}|null{
    if(formControl.value!==this.passwordHolder){
      return {'repeat':true};
    }else{
      return null
    }
  }

}
