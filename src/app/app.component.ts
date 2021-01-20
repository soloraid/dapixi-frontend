import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PostService } from './share/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostListener('window:storage', ['$event']) checkLocal(){
    this._authService.autoLogIn();
  }
  constructor(private _authService:AuthService,private _postService:PostService){}
  ngOnInit(){
    this._authService.autoLogIn();
    this._postService.getCategoriesMap().subscribe(
      ()=>console.log(this._postService.getCategoriesPairs())
      )
  }


}
