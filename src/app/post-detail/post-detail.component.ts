import {Component, OnInit} from '@angular/core';
import {PostDetailService} from './post-detail.service';
import {Post} from '../share/post/post.module';
import {environment} from '../../environments/environment.prod';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  postUrl: string;
  isEmpty = true;
  constructor(private postDetailService: PostDetailService) {
  }

  ngOnInit(): void {
    this.post = this.postDetailService.post;
    this.postUrl = environment.api + '/photo' + this.post.imageUrl;
    this.isEmpty = false;
  }

}
