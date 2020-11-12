import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    // console.log(form);
    this._authService.signIn();
  }
}
