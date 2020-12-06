import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class MoreComponent implements OnInit {
  title:String="";
  postView: Post[] = [];
  postObserv:Observable<any>;
  postSubs:Subscription;
  isEmpty = true;
  p = 1;
  p2 = 1;
  constructor(private _rout:ActivatedRoute,private _postService:PostService,public loaderService:LoaderService) { }

  ngOnInit(): void {
    const type=this._rout.snapshot.params['type'];
    switch(type){
      case 'latest':
        this.title='آخرین پست‌ها'
        this.postObserv=this._postService.getLatestPost(15);
        break;
      case 'recomended':
        this.title='پست‌های پیشنهادی'
        break;
    }
    console.log(this.title);
    this.postObserv.subscribe((posts:Post[])=>{
      posts.forEach((post:Post)=>{
        this.postView.push(post);
      })
    })
  }

}
