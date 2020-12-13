import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Subscription} from 'rxjs';
import {ProfileService} from '../profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ProfileEditComponent implements OnInit {
  firstLastNameForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;
  dateForm: FormGroup;
  passwordForm: FormGroup;
  hide1 = true;
  hide2 = true;
  passwordHolder = '';
  errorMsg = '';
  editSubs: Subscription;
  isChangeName = true;
  isChangeEmail = true;
  isChangePhone = true;
  isChangeDate = true;
  isChangePassword = true;

  constructor(private profileService: ProfileService, private router: Router){
  }

  ngOnInit(): void {
    this.firstLastNameForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)])
    });
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.phoneForm = new FormGroup({
      phone: new FormControl('', Validators.pattern(/(09\d{9})|([+|0]989\d{9})/))
    });

    this.dateForm = new FormGroup({
      date: new FormControl('', [Validators.required, this.dateValidator.bind(this)])
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRep: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordRepeatValidator.bind(this)])

    });
  }

  onSubmit() {
    if (this.isChangeName) {
      this.profileService.editProfileFirstLastName(
        this.firstLastNameForm.get('firstName').value,
        this.firstLastNameForm.get('lastName').value
      );
    }
    if (this.isChangeEmail) {
      this.profileService.editProfileEmail(this.emailForm.get('email').value);
    }
    if (this.isChangePhone) {
      this.profileService.editProfilePhone(this.phoneForm.get('phone').value);
    }
    if (this.isChangeDate) {
      this.profileService.editProfileDate(this.dateForm.get('date').value);
    }
    if (this.isChangePassword) {
      this.profileService.editProfilePassword(this.passwordForm.get('password').value);
    }
  }

  private dateValidator(formControl: FormControl): { [k: string]: boolean } | null {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const input = new Date(Date.parse(formControl.value + 'T00:00:00.000'));
    if (input.getTime() >= today.getTime()) {
      return {today: true};
    } else {
      return null;
    }
  }

  private passwordRepeatValidator(formControl: FormControl): { [k: string]: boolean } | null {
    if (formControl.value !== this.passwordHolder) {
      return {repeat: true};
    } else {
      return null;
    }
  }

  changeName(): void {
    this.isChangeName = false;
  }

  changeEmail(): void {
    this.isChangeEmail = false;
  }

  changePhone(): void {
    this.isChangePhone = false;
  }
  changeDate(): void  {
    this.isChangeDate = false;
  }
  changePassword(): void  {
    this.isChangePassword = false;
  }
}
