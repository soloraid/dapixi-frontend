import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post/post.module';

@Component({
  selector: 'app-masonry-posts',
  templateUrl: './masonry-posts.component.html',
  styleUrls: ['./masonry-posts.component.scss']
})
export class MasonryPostsComponent implements OnInit {
  @Input() posts:Post[]=[];
  isExist:boolean;
  @Input() mode:string;
  subs:Subscription
  constructor(private _postService:PostService) { }

  ngOnInit(): void {
  }

}
