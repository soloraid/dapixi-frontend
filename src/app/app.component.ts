import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostListener('window:storage', ['$event']) checkLocal(){
    this._authService.autoLogIn();
  }
  constructor(private _authService:AuthService){}
  ngOnInit(){
    this._authService.autoLogIn();
    // window.addEventListener('storage')
  }


}
