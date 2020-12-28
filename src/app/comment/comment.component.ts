import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../share/post.service';
import { Tokens } from '../share/tokens.model';
import { User } from '../share/user/user.mudole';
import {LoaderService} from '../share/loader/loader.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
  commentsOfUsers: DateUser;
  isAuth: boolean;
  authSubs: Subscription;
  id: string;
  sendingComment: string = "";
  sendSubs: Subscription;
  isOpen: boolean = false;
  getSubs: Subscription;
  nocomment: boolean = false;
  comments: Comment[];
  commentError:string="";
  constructor(private authService: AuthService,
              private _rout: ActivatedRoute,
              private _postService: PostService,
              public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.authSubs = this.authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this._rout.params.subscribe((data) => {
      this.id = this._rout.snapshot.params['id'];
      this.getComments();
    });
  }

  onSubmit(cForm: HTMLFormElement) {
    console.log(this.id);
    console.log(this.sendingComment);
    if(this.authService.isInLocal()){
      this.sendSubs = this._postService.addComment(this.id, this.sendingComment).subscribe((data) => {
        // this.sendingComment="";
        console.log(data);
        this.getComments();
        this.sendingComment = '';
        this.commentError="";
      });
    }else{
      this.commentError='برای ثبت نظر باید وارد حساب کاربری خود شوید';
    }

  }
  /*toggle() {
    this.isOpen = !this.isOpen;
    this.getComments();
  }*/
  private getComments() {
    console.log(this.isOpen);
    if (true) {
      this.getSubs = this._postService.getComments(this.id).subscribe((comments: Comment[]) => {
        if (comments.length) {
          this.comments = comments.reverse();
          this.nocomment = false;
        } else {
          this.nocomment = true;
        }
        console.log(comments);
      });
    }
  }

}

interface DateUser {
  username: string;
  imageUrl: string;
  comment: string;
}
interface Comment {
  id: string;
  photoId: string;
  username: string;
  content: string;
  creationDate: string;
  updateDate: string;
}
