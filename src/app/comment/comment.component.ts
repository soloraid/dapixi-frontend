import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Tokens } from '../share/tokens.model';
import { User } from '../share/user/user.mudole';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
  commentsOfUsers: DateUser;
  isAuth:boolean;
  authSubs:Subscription
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.authSubs=this._authService.authState.subscribe((token:Tokens)=>{
      this.isAuth=!!token;
    })
  }

}

interface DateUser {
  username: string;
  imageUrl: string;
  comment: string;
}
