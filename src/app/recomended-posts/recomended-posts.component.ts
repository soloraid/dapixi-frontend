import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../share/loader/loader.service';
import { PostService } from '../share/post.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-recomended-posts',
  templateUrl: './recomended-posts.component.html',
  styleUrls: ['./recomended-posts.component.scss']
})
export class RecomendedPostsComponent implements OnInit {
  recommendedPosts: Post[] = [];
  hasRecommended: boolean = false;
  recomendSubs: Subscription;
  firstLoad:boolean=true;
  constructor(
    public loaderService: LoaderService,
    private _postService: PostService
  ) { }

  ngOnInit(): void {
    this.recomendSubs = this._postService.getRecommenderPosts(9).subscribe((posts: Post[]) => {
      if (posts.length > 0) {
        this.recommendedPosts = posts;
        this.hasRecommended=true;
      }
      this.firstLoad=false;
    })
  }

}
