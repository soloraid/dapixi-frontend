import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../search/search.service';
import { LoaderService } from '../share/loader/loader.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.scss']
})
export class CategoryPostsComponent implements OnInit {
  title:string;
  routSubs:Subscription;
  categoryPosts:Post[]=[];
  postSubs:Subscription;
  constructor(public loaderService:LoaderService,private _route:ActivatedRoute,private searchService:SearchService) { }

  ngOnInit(): void {
    this.routSubs=this._route.params.subscribe(()=>{
      this.title=this._route.snapshot.params.title;
      this.postSubs=this.searchService.searchByCategories([this.title],9).subscribe((posts:Post[])=>{
        this.categoryPosts=posts;
        console.log(posts);
      })
    });

  }

}
