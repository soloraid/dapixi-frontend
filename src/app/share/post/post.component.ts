import {Component, Input, OnInit} from '@angular/core';
import {Post} from './post.module';
import {environment} from '../../../environments/environment.prod';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input() post: Post;
  postUrl: string;
  isEmpty = true;

  constructor() {
  }

  ngOnInit(): void {
    if (this.post) {
      this.postUrl = environment.api + '/photo' + this.post.imageUrl;
      this.isEmpty = false;
    }

  }

}
