import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PostService} from '../post.service';
import {Post} from '../post/post.module';
import {SearchService} from '../../search/search.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-masonry-posts',
  templateUrl: './masonry-posts.component.html',
  styleUrls: ['./masonry-posts.component.scss']
})
export class MasonryPostsComponent implements OnInit, OnDestroy,OnChanges {
  @Input() posts: Post[] = [];
  @Input() mode: string;
  @Input() service: string;
  @Input() params: string;
  subs: Subscription;
  roureSubs:Subscription;
  loadingImages = true;
  hasMore: boolean=false;
  value = 9;
  page = 1;
  end = false;

  constructor(private postService: PostService, private searchService: SearchService,private _router:Router) {
  }

  ngOnInit(): void {
    // console.log('m',this.posts);
    this.initialize();
    // this.roureSubs=this._router.events.subscribe((data)=>{
    //   if(data instanceof NavigationEnd){
    //     this.loadingImages=true;
    //     // this.hasMore=false;
    //     // this.initialize();
    //     console.log('rh');
    //   }
    // });
  }
  ngOnChanges(){
    console.log('c');
    this.initialize();
  }
  private initialize(){
    console.log('m',this.posts);
    console.log('l',this.loadingImages);
    this.loadingImages=true;
    if(this.posts.length){
      this.setHasMore();
    }else{
      this.loadingImages=false;
    }
  }
  // ngOnChanges(){
  //   console.log('lh-------------');
  //   console.log(this.posts);
  //   console.log(this.params);
  //   console.log(this.mode);
  //   console.log(this.service)
    
    
  // }

  showMore(): void {
    let getObservable: Observable<any>;
    if (this.service !== 'searchService') {
      if (this.params) {
        getObservable = this.postService[this.mode](this.params, this.value, this.page);
      } else {
        getObservable = this.postService[this.mode](this.value, this.page);
      }
    } else {
      // console.log(this.mode,this.params);
      getObservable = this.searchService[this.mode](this.params, this.value, this.page);
    }

    this.subs = getObservable.subscribe((posts: Post[]) => {
      this.loadingImages = true;
      if (posts.length > 0) {
        posts.forEach((post: Post) => {
          this.posts.push(post);
        });
      } else {
        this.end = true;
        this.loadingImages = false;
      }
    });
    this.page += 1;
  }

  onItemsLoaded(): void {
    this.loadingImages = false;
  }

  private setHasMore(posts: Post[] = this.posts): void {
    console.log('len',this.posts.length);
    if (posts.length >= this.value) {
      this.hasMore = true;
      this.loadingImages = true;
    }else{
      this.hasMore=false;
    }
    console.log('h',this.hasMore);
  }

  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
    this.roureSubs && this.roureSubs.unsubscribe();
    console.log('d');
  }
}
