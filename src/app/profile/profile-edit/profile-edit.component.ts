import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Subscription} from 'rxjs';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/share/user/user.mudole';
import {LoaderService} from 'src/app/share/loader/loader.service';
import {ConfirmDialogComponent} from '../../share/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
  }]
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  user: User;
  firstLastNameForm: FormGroup;
  nameLoading = false;
  emailForm: FormGroup;
  emailLoading = false;
  emailError = '';
  phoneForm: FormGroup;
  phoneLoading = false;
  phoneError = '';
  dateForm: FormGroup;
  dateLoading = false;
  passwordForm: FormGroup;
  passwordLoading = false;
  success: string[] = [];
  // errors:string[]=[];
  hide1 = true;
  hide2 = true;
  passwordHolder = '';
  editSubs: Subscription[] = [];
  subs: Subscription[] = [];

  constructor(private profileService: ProfileService, private _router: Router, private _route: ActivatedRoute,
              public loaderService: LoaderService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    const userSubs: Subscription = this.profileService.getProfile()
      .subscribe((user: User) => {
        this.user = user;
        this.intializeForm();
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
      phone: new FormControl('', [Validators.pattern(/(09\d{9})|([+|0]989\d{9})/), Validators.maxLength(11)])
    });

    this.dateForm = new FormGroup({
      date: new FormControl('', [Validators.required, this.dateValidator.bind(this)])
    });
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordRep: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordRepeatValidator.bind(this)])

    });
  }

  private intializeForm(): void {
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

  onPasswordChange(event): void {
    this.passwordHolder = event.target.value;
  }

  changeName(): void {
    // tslint:disable-next-line:max-line-length
    const nameSubs: Subscription = this.profileService.editProfileFirstLastName(this.firstLastNameForm.get('firstName').value,
      this.firstLastNameForm.get('lastName').value)
      .subscribe((data => {
        this.nameLoading = true;
        this.success.push('نام و نام‌خانوادگی با موفقت عوض شد');
        this.nameLoading = false;
      }));
    this.editSubs.push(nameSubs);
  }

  changeEmail(): void {
    const emailSubs: Subscription = this.profileService.editProfileEmail(this.emailForm.get('email').value)
      .subscribe(
        data => {
          this.emailLoading = true;
          this.success.push('ایمیل با موفقیت تغییر یافت');
          this.emailLoading = false;
          this.emailError = '';
        },
        (errorData: string) => {
          // this.errors.push(errorData);
          this.emailError = errorData;
        }
      );
    this.editSubs.push(emailSubs);
  }

  changePhone(): void {
    const phoneSubs: Subscription = this.profileService.editProfilePhone(this.phoneForm.get('phone').value)
      .subscribe(
        data => {
          this.phoneLoading = true;
          this.success.push('شماره همراه با موفقیت تغییر یافت');
          this.phoneLoading = false;
          this.phoneError = '';
        },
        (errorData: string) => {
          this.phoneError = errorData;
        }
      );
    this.editSubs.push(phoneSubs);
  }

  changeDate(): void {
    const dateSubs: Subscription = this.profileService.editProfileDate(this.dateForm.get('date').value)
      .subscribe(data => {
        this.dateLoading = true;
        this.success.push('تاریخ تولد با موفقیت عوض شد');
        this.dateLoading = false;
      });
    this.editSubs.push(dateSubs);
  }

  changePassword(): void {
    const passwordSubs: Subscription = this.profileService.editProfilePassword(this.passwordForm.get('password').value)
      .subscribe(data => {
        this.passwordLoading = true;
        this.success.push('رمز عبور با موفقیت تغییر یافت');
        this.passwordLoading = false;
      });
    this.editSubs.push(passwordSubs);
  }

  deletError(event): void {
    (event.target as HTMLElement).parentElement.style.display = 'none';
  }

  showDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    const showDialogSubs: Subscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProfile();
      }
    });
    this.subs.push(showDialogSubs);
  }

  private deleteProfile(): void {
    const deletePostSubs: Subscription = this.profileService.deleteProfile().subscribe(data => {
      this._router.navigate(['auth/enter']);

    });
    this.subs.push(deletePostSubs);
  }

  finish(): void {
    this._router.navigate(['../'], {relativeTo: this._route});
  }

  ngOnDestroy(): void {
    this.editSubs.forEach((subs: Subscription) => {
      subs && subs.unsubscribe();
    });
  }
}
