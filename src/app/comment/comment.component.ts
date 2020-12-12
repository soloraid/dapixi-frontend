import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  panelOpenState = false;
  commentsOfUsers: DateUser;
  constructor() { }

  ngOnInit(): void {
  }

}

interface DateUser {
  username: string;
  imageUrl: string;
  comment: string;
}
