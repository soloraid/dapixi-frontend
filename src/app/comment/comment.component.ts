import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../share/post.service';
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
  authSubs:Subscription;
  id:string;
  comment:string="";
  sendSubs:Subscription;
  constructor(private _authService:AuthService,private _rout:ActivatedRoute,private _postService:PostService) { }

  ngOnInit(): void {
    this.authSubs=this._authService.authState.subscribe((token:Tokens)=>{
      this.isAuth=!!token;
    });
    this._rout.params.subscribe((data)=>{
      this.id=this._rout.snapshot.params['id'];
    })
  }
  onSubmit(cForm:NgForm){
    console.log(this.id);
    console.log(this.comment);
    this.sendSubs=this._postService.addComment(this.id,this.comment).subscribe((data)=>{
      console.log(data);
    })
  }

}

interface DateUser {
  username: string;
  imageUrl: string;
  comment: string;
}
