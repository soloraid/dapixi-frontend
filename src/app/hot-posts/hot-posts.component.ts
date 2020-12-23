import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../share/loader/loader.service';
import { PostService } from '../share/post.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-hot-posts',
  templateUrl: './hot-posts.component.html',
  styleUrls: ['./hot-posts.component.scss']
})
export class HotPostsComponent implements OnInit {
  hotPosts:Post[]=[];
  isExist:boolean=false;
  hotPostSubs:Subscription;
  constructor(
    public loaderService:LoaderService,
    private _postService:PostService
  ) { }

  ngOnInit(): void {
    this.hotPostSubs=this._postService.getHighRatedPost(9).subscribe((posts:Post[])=>{
      if(posts.length>0){
        this.hotPosts=posts;
        this.isExist=true;
      }
    })
  }

}
