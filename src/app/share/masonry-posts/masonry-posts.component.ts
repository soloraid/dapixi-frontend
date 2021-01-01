import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post/post.module';

@Component({
  selector: 'app-masonry-posts',
  templateUrl: './masonry-posts.component.html',
  styleUrls: ['./masonry-posts.component.scss']
})
export class MasonryPostsComponent implements OnInit,OnDestroy {
  @Input() posts: Post[] = [];
  @Input() mode: string;
  @Input() params:string;
  subs: Subscription;
  loadingImages:boolean=false;
  hasMore:boolean;
  value: number = 9;
  page: number = 1;
  end:boolean=false;
  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    // console.log(this.posts);
    this.setHasMore();
  }
  showMore() {
    let getObservable:Observable<any>;
    // console.log(this.mode);
    if(this.params){
      getObservable=this._postService[this.mode](this.params,this.value,this.page);
    }else{
      getObservable=this._postService[this.mode](this.value,this.page);
    }
    this.subs = getObservable.subscribe((posts:Post[])=>{
      this.loadingImages=true;
      if(posts.length>0){
        posts.forEach((post:Post)=>{
          this.posts.push(post);
        })
      }else{
        this.end=true;
        this.loadingImages=false;
      }
    });
    this.page+=1;
  }
  onItemsLoaded(){
    this.loadingImages=false;
  }
  private setHasMore(posts:Post[]=this.posts){
    // console.log(posts.length)
    if(posts.length>=this.value){
      this.hasMore=true;
      this.loadingImages = true;
    }
  }
  ngOnDestroy(){
    this.subs && this.subs.unsubscribe();
  }
}
