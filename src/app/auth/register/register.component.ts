import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {LoaderService} from '../../share/loader/loader.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    domain = environment.domain;
    regForm: FormGroup;
    passwordHolder = '';
    errorMsg = '';
    signUpSubs: Subscription;

    // loginSubs:Subscription;
    constructor(private _authService: AuthService, private router: Router, public loaderService: LoaderService) {
    }

    ngOnInit(): void {
        this.regForm = new FormGroup({
            'firstName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
            'lastName': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
            'userName': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
            'phone': new FormControl('', [Validators.pattern(/(09\d{9})|([+|0]989\d{9})/), Validators.maxLength(11)]),
            'date': new FormControl('', [Validators.required, this.dateValidator.bind(this)]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
            'passwordRep': new FormControl('', [Validators.required, Validators.minLength(6), this.passwordRepeatValidator.bind(this)])

        });
    }

    onPasswordChange(event) {
        this.passwordHolder = event.target.value;
        // console.log(event.target.value);
        // console.log(this.passwordHolder);
    }

    onSubmit() {
        this.signUpSubs = this._authService.signUp(
            this.regForm.get('userName').value,
            this.regForm.get('firstName').value,
            this.regForm.get('lastName').value,
            this.regForm.get('password').value,
            this.regForm.get('phone').value,
            this.regForm.get('email').value,
            this.regForm.get('date').value
        ).subscribe(
            (data) => {
                console.log(data);
                this._authService.confirmation.next(this.regForm.get('email').value);
                this.router.navigate(['/auth/confirm'])
                // this.loginSubs=this._authService
                // .login(this.regForm.get('userName').value,this.regForm.get('password').value)
                // .subscribe((data)=>{
                //   this.router.navigate(['']);
                // });
            },
            (errorData: string) => {
                this.errorMsg = errorData;
                // setTimeout(()=>{
                //   this.errorMsg="";
                // },5000);
                // console.log(errorData);
            }
        )
    }

    minError(formControlName: string) {
        // console.log('v',this.regForm.controls[formControlName].errors);
        if (this.regForm.controls[formControlName].errors && this.regForm.controls[formControlName].errors['minlength']) {
            if (this.regForm.controls[formControlName].errors['minlength'] && this.regForm.controls[formControlName].touched) {
                return true;
            } else {
                return false;
            }
        }
    }

    private dateValidator(formControl: FormControl): { [k: string]: boolean } | null {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const input = new Date(Date.parse(formControl.value + "T00:00:00.000"));
        if (input.getTime() >= today.getTime()) {
            return {'today': true}
        } else {
            return null;
        }
    }

    private passwordRepeatValidator(formControl: FormControl): { [k: string]: boolean } | null {
        if (formControl.value !== this.passwordHolder) {
            return {'repeat': true};
        } else {
            return null
        }
    }

    ngOnDestroy() {
        if (this.signUpSubs) {
            this.signUpSubs.unsubscribe();
            // if(this.loginSubs){
            //   this.loginSubs.unsubscribe();
            // }
        }
    }
}
