import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../share/post.service';
import { Tokens } from '../share/tokens.model';
import { User } from '../share/user/user.mudole';
import {LoaderService} from '../share/loader/loader.service';
import {Post} from '../share/post/post.module';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  isAuth: boolean;
  authSubs: Subscription;
  id: string;
  sendingComment = '';
  sendSubs: Subscription;
  isOpen = false;
  getSubs: Subscription;
  nocomment = false;
  comments: Comment[];
  commentError = '';
  value = 9;
  page = 1;
  end = false;
  hasMore: boolean;
  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private postService: PostService,
              public loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.authSubs = this.authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
    });
    this.route.params.subscribe((data) => {
      this.id = this.route.snapshot.params.id;
      this.getComments();
    });
    this.setHasMore();
  }

  onSubmit(cForm: HTMLFormElement):void {
    console.log(this.id);
    console.log(this.sendingComment);
    if(this.authService.isInLocal()){
      this.sendSubs = this.postService.addComment(this.id, this.sendingComment).subscribe((data) => {
        // this.sendingComment="";
        console.log(data);
        this.getComments();
        this.sendingComment = '';
        this.commentError = '';
      });
    }else{
      this.commentError = 'برای ثبت نظر باید وارد حساب کاربری خود شوید';
    }

  }
  /*toggle() {
    this.isOpen = !this.isOpen;
    this.getComments();
  }*/
  private getComments() {
    console.log(this.isOpen);
    if (true) {
      this.getSubs = this.postService.getComments(this.id, 5).subscribe((comments: Comment[]) => {
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

  showMore(): void {
    let getObservable: Observable<any>;
    getObservable = this.postService.getComments(this.id, this.value, this.page);
    this.getSubs = getObservable.subscribe((comments: Comment[]) => {
      if (comments.length > 0) {
        comments.forEach((comment: Comment) => {
          this.comments.push(comment);
        });
      } else {
        this.end = true;
      }
    });
    this.page += 1;
  }

  private setHasMore(comments: Comment[]= this.comments): void{

    if (comments.length >= this.value){
      this.hasMore = true;
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
