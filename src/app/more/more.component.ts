import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { strict } from 'assert';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from '../share/loader/loader.service';
import { PostService } from '../share/post.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit, OnDestroy {
  title: String = '';
  typePost: string;
  postView: Post[] = [];
  postObserv: Observable<any>;
  postSubs: Subscription;
  isEmpty = true;
  value = 15;
  page = 0;
  first = true;
  end = false;
  constructor(private _rout: ActivatedRoute, private _postService: PostService, public loaderService: LoaderService, private _router: Router) { }

  ngOnInit(): void {
    this.typePost = this._rout.snapshot.params.type;
    const type = this._rout.snapshot.params.type;
    switch (type) {
      case 'latest':
        this.title = 'آخرین پست‌ها';
        this.postObserv = this._postService.getLatestPost(this.value, this.page);
        break;
      case 'recomended':
        this.title = 'پست‌های پیشنهادی';
        this.postObserv = this._postService.getRecommenderPosts(this.value, this.page);
        break;
      case 'followed':
        this.title = 'پست‌های دنبال‌شوندگان';
        this.postObserv = this._postService.getFollowedPost(this.value, this.page);
        break;
      case 'highrated':
        this.title = 'محبوب‌ترین پست‌ها';
        this.postObserv = this._postService.getHighRatedPost(this.value, this.page);
        break;
      default:
        this._router.navigate(['404']);
    }
    console.log(this.title);
    this.postObserv && this.subs();

  }
  private subs() {
    this.postObserv.subscribe((posts: Post[]) => {
      if (posts.length) {
        posts.forEach((post: Post) => {
          this.postView.push(post);
        });
      }else{
        this.end = true;
      }
    });
  }
  getmore() {
    this.first = false;
    this.page += 1;
    switch (this.typePost) {
      case 'latest':
        this.postObserv = this._postService.getLatestPost(this.value, this.page);
        break;
      case 'recomended':
        this.postObserv = this._postService.getRecommenderPosts(this.value, this.page);
        break;
      case 'followed':
        this.postObserv = this._postService.getFollowedPost(this.value, this.page);
        break;
      case 'highrated':
        this.postObserv = this._postService.getHighRatedPost(this.value, this.page);
        break;
      default:
        this._router.navigate(['404']);
    }
    this.subs();
  }
  ngOnDestroy(){
    this.postSubs && this.postSubs.unsubscribe();
  }
}
