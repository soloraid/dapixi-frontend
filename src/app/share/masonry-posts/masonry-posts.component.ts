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
  @Input() posts: Post[] = [];
  @Input() mode: string;
  subs: Subscription;
  loadingImages:boolean=true;
  hasMore:boolean;
  value: number = 9;
  page: number = 1;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this.setHasMore();
  }
  showMore() {
    this.subs = this._postService[this.mode](this.value,this.page).subscribe((posts:Post[])=>{
      this.loadingImages=true;
      if(posts.length>0){
        posts.forEach((post:Post)=>{
          this.posts.push(post);
        })
      }
    });
    this.page+=1;
  }
  onItemsLoaded(){
    this.loadingImages=false;
  }
  private setHasMore(posts:Post[]=this.posts){
    if(posts.length>=this.value){
      this.hasMore=true;
    }
  }
}
