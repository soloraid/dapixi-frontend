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
  isAuth: boolean;
  authSubs: Subscription;
  id: string;
  sendingComment: string = "";
  sendSubs: Subscription;
  isOpen: boolean = false;
  getSubs: Subscription;
  nocomment: boolean = false;
  comments: Comment[];
  constructor(private _authService: AuthService, private _rout: ActivatedRoute, private _postService: PostService) { }

  ngOnInit(): void {
    this.authSubs = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this._rout.params.subscribe((data) => {
      this.id = this._rout.snapshot.params['id'];
    })
  }
  onSubmit(cForm: NgForm) {
    console.log(this.id);
    console.log(this.sendingComment);
    this.sendSubs = this._postService.addComment(this.id, this.sendingComment).subscribe((data) => {
      // this.sendingComment="";
      console.log(data);
    });

    this.getComments();

  }
  toggle() {
    this.isOpen = !this.isOpen;
    this.getComments();
  }
  private getComments() {
    console.log(this.isOpen);
    if (this.isOpen) {
      this.getSubs = this._postService.getComments(this.id).subscribe((comments: Comment[]) => {
        if (comments.length) {
          this.comments = comments;
          this.nocomment = false;
        } else {
          this.nocomment = true;
        }
        console.log(comments);
      })
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
