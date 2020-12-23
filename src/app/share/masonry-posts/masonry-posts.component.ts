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
  @Input() getFunction:(Function);
  subs:Subscription
  constructor(private _postService:PostService) { }

  ngOnInit(): void {
    // this.subs=(<Observable<any>>this.getFunction(9)).subscribe((posts:Post[])=>{
    //   console.log(posts)
    //   if(this.posts.length>0){
    //     posts=posts;
    //   }
    // })
    // this.subs=this._postService['getLatestPost'](9).subscribe((posts:Post[])=>{
    //   if(posts.length){
    //     this.posts=posts;
    //   }
    // })
  }

}
