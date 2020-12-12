import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LoaderService} from '../../share/loader/loader.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm:FormGroup;
  passwordHolder:string='';
  confirm:boolean=false;
  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.resetForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email])
    })
  }
  onSubmit(){
    console.log(this.resetForm);
  }

}
