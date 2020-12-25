import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { User } from 'src/app/share/user/user.mudole';
import { ErrorStateMatcher } from '@angular/material/core';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false,showError: true }
  }]
})
export class ProfileEditComponent implements OnInit {
  user: User;
  firstLastNameForm: FormGroup;
  nameLoading:boolean=false;
  emailForm: FormGroup;
  emailLoading:boolean=false;
  emailError:string='';
  phoneForm: FormGroup;
  phoneLoading:boolean=false;
  dateForm: FormGroup;
  dateLoading:boolean=false;
  passwordForm: FormGroup;
  passwordLoading: boolean=false;
  firstName: string;
  lastname: string;
  email: string;
  phone: string;
  date: string;
  password: string;
  success:string[]=[];
  errors:string[]=[];
  hide1 = true;
  hide2 = true;
  passwordHolder = '';
  errorMsg = '';
  editSubs: Subscription[] = [];
  isChangeName = false;
  isChangeEmail = false;
  isChangePhone = false;
  isChangeDate = false;
  isChangePassword = false;
  matcher=new ErrorStateMatcher();

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit(): void {
    let userSubs: Subscription = this.profileService.getProfile()
    .subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
      this.intializeForm();
      // this.intitForm();
    });
    this.editSubs.push(userSubs);
    this.firstLastNameForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)])
    });
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.phoneForm = new FormGroup({
      phone: new FormControl('', [Validators.pattern(/(09\d{9})|([+|0]989\d{9})/),Validators.maxLength(11)])
    });

    this.dateForm = new FormGroup({
      date: new FormControl('', [Validators.required, this.dateValidator.bind(this)])
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRep: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordRepeatValidator.bind(this)])

    });
  }
  private intializeForm() {
    this.firstLastNameForm.get('firstName').setValue(this.user.firstName);
    this.firstLastNameForm.get('lastName').setValue(this.user.lastName);
    this.emailForm.get('email').setValue(this.user.email);
    this.phoneForm.get('phone').setValue(this.user.mobile);
    this.dateForm.get('date').setValue(this.user.birthDate);
  }

  private dateValidator(formControl: FormControl): { [k: string]: boolean } | null {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const input = new Date(Date.parse(formControl.value + 'T00:00:00.000'));
    if (input.getTime() >= today.getTime()) {
      return { today: true };
    } else {
      return null;
    }
  }

  private passwordRepeatValidator(formControl: FormControl): { [k: string]: boolean } | null {
    if (formControl.value !== this.passwordHolder) {
      return { repeat: true };
    } else {
      return null;
    }
  }
  onPasswordChange(event){
    this.passwordHolder=event.target.value;
    // console.log(event.target.value);
    // console.log(this.passwordHolder);
  }
  changeName(): void {
    console.log(this.firstLastNameForm);
    // console.log(this.isChangeName);
    let nameSubs:Subscription = this.profileService.editProfileFirstLastName(this.firstLastNameForm.get('firstName').value,this.firstLastNameForm.get('lastName').value)
    .subscribe((data=>{
      this.nameLoading=true;
      this.success.push('نام و نام‌خانوادگی با موفقت عوض شد');
      this.nameLoading=false;
    }));
    this.editSubs.push(nameSubs);
    // console.log(this.firstName,'\n',this.lastname);
  }

  changeEmail(): void {
    // console.log(this.emailForm.get('email').value);
    let emailSubs:Subscription=this.profileService.editProfileEmail(this.emailForm.get('email').value)
    .subscribe(
      data=>{
      this.emailLoading=true;
      console.log(data);
      this.success.push('ایمیل با موفقیت تغییر یافت');
      this.emailLoading=false;  
      this.emailError="";   
    },
    (errorData:string)=>{
      // this.errors.push(errorData);
      this.emailError=errorData;
    }
    );
    this.editSubs.push(emailSubs);
  }

  changePhone(): void {
    let phoneSubs:Subscription=this.profileService.editProfilePhone(this.phoneForm.get('phone').value)
    .subscribe(data=>{
      this.phoneLoading=true;
      console.log(data);
      this.success.push("شماره همراه با موفقیت تغییر یافت");
      this.phoneLoading=false;
    });
    this.editSubs.push(phoneSubs);
  }
  changeDate(): void {
    let dateSubs:Subscription=this.profileService.editProfileDate(this.dateForm.get('date').value)
    .subscribe(data=>{
      this.dateLoading=true;
      console.log(data);
      this.success.push('تاریخ تولد با موفقیت عوض شد');
      this.dateLoading=false;      
    });
    this.editSubs.push(dateSubs);
  }
  changePassword(): void {
    let passwordSubs:Subscription=this.profileService.editProfilePassword(this.passwordForm.get('password').value)
    .subscribe(data=>{
      this.passwordLoading=true;
      console.log(data);
      this.success.push('رمز عبور با موفقیت تغییر یافت');
      this.passwordLoading=false;
    })
  }
  deletError(event){
    // console.log((<HTMLElement>event.target).style.display='none');
    (<HTMLElement>event.target).parentElement.style.display='none';
  }
}
