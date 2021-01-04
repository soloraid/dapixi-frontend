import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {PostService} from '../post.service';
import {Post} from '../post/post.module';
import {SearchService} from '../../search/search.service';

@Component({
  selector: 'app-masonry-posts',
  templateUrl: './masonry-posts.component.html',
  styleUrls: ['./masonry-posts.component.scss']
})
export class MasonryPostsComponent implements OnInit, OnDestroy {
  @Input() posts: Post[] = [];
  @Input() mode: string;
  @Input() service: string;
  @Input() params: string;
  subs: Subscription;
  loadingImages = true;
  hasMore: boolean;
  value = 9;
  page = 1;
  end = false;

  constructor(private postService: PostService, private searchService: SearchService) {
  }

  ngOnInit(): void {
    console.log(this.posts.length);
    if(this.posts.length){
      this.setHasMore();
    }else{
      this.loadingImages=false;
    }
  }

  showMore(): void {
    let getObservable: Observable<any>;
    if (this.service !== 'searchService') {
      if (this.params) {
        getObservable = this.postService[this.mode](this.params, this.value, this.page);
      } else {
        getObservable = this.postService[this.mode](this.value, this.page);
      }
    } else {
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
    // console.log(posts.length)
    if (posts.length >= this.value) {
      this.hasMore = true;
      this.loadingImages = true;
    }
  }

  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }
}
