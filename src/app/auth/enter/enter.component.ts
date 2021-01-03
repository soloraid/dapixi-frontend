import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {LoaderService} from '../../share/loader/loader.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit, OnDestroy {

  constructor(private _authService: AuthService, private _router: Router,
              private _rout: ActivatedRoute, public loaderService: LoaderService) {
  }

  errorMsg = '';
  @ViewChild('enter_form', {static: false}) enterForm: NgForm;
  username: string;
  initError: string;
  // password:String;
  hasRemember = false;
  loginSubs: Subscription;
  back: string;

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    // const password=localStorage.getItem('password');
    if (username) {
      this.username = username;
      // this.password=password;
      this.hasRemember = true;
    }
    const usernameFirst = this._rout.snapshot.paramMap['username'];
    if (usernameFirst) {
      this.username = usernameFirst;
    }
    const err = this._rout.snapshot.queryParamMap.get('error');

    if (err) {
      // console.log(err);
      this.initError = ` برای ادامه باید وارد حساب کاربری خود شوید.`
    }
    const back = this._rout.snapshot.queryParamMap.get('back');
    if (back) {
      this.back = back;
      console.log(back);
    }
    // console.log(this.enterForm);

  }

  onSubmit() {
    console.log(this.enterForm.value);
    // console.log(!!form.value['remember']);
    const username = this.enterForm.value.username;
    const password = this.enterForm.value.password;
    this.loginSubs = this._authService
      .login(username, password)
      .subscribe(
        data => {
          console.log(data);
          if (this.enterForm.value['remember']) {
            this.remember(username);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          if (this.back) {
            this._router.navigate([this.back]);
          } else {
            this._router.navigate(['/']);
          }
        },
        (errorData: string) => {
          console.log(errorData);
          this.errorMsg = errorData;
          // setTimeout(()=>{
          //   this.errorMsg="";
          // },5000)
        }
      );
  }

  ngOnDestroy() {
    if (this.loginSubs) {

      this.loginSubs.unsubscribe();
    }
  }

  private remember(username: string): void {
    localStorage.setItem('username', username);
    // localStorage.setItem('password',password);
  }
}
