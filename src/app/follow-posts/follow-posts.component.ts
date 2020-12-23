import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../share/loader/loader.service';
import { PostService } from '../share/post.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-follow-posts',
  templateUrl: './follow-posts.component.html',
  styleUrls: ['./follow-posts.component.scss']
})
export class FollowPostsComponent implements OnInit,OnDestroy {
  followedPosts: Post[] = [];
  hasFollow:boolean;
  followPostSubs:Subscription;
  constructor(
    public loaderService:LoaderService,
    private _postService:PostService
  ) { }

  ngOnInit(): void {
    this.followPostSubs=this._postService.getFollowedPost(9).subscribe((posts:Post[])=>{
      if(posts.length>0){
        this.followedPosts=posts;
        this.hasFollow=true;
      }
    })
  }
  ngOnDestroy(){
    this.followPostSubs && this.followPostSubs.unsubscribe();
  }

}
