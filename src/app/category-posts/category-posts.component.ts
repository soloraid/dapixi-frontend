import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../search/search.service';
import { Category } from '../share/category.type';
import { LoaderService } from '../share/loader/loader.service';
import { PostService } from '../share/post.service';
import { Post } from '../share/post/post.module';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.scss']
})
export class CategoryPostsComponent implements OnInit,OnDestroy {
  title: string;
  routSubs: Subscription;
  categoryPosts: Post[] = [];
  categories: Category[] = [];
  catSubsc: Subscription;
  postSubs: Subscription;
  firstLoad: boolean = true;
  englishTitle: string;
  constructor(public loaderService: LoaderService, private _route: ActivatedRoute, private searchService: SearchService, private _postService: PostService) { }

  ngOnInit(): void {
    this.routSubs = this._route.params.subscribe(() => {
      this.firstLoad=true;
      this.englishTitle = this._route.snapshot.params.title;
      this.postSubs = this.searchService.searchByCategories([this.englishTitle], 9).subscribe((posts: Post[]) => {
        if (posts.length > 0) {
          this.categoryPosts = posts;
        }
        this.firstLoad = false;
        
        if (this._postService.getCategoriesPairs()) {
          this.categories = this._postService.getCategoriesPairs();
        } else {
          this.catSubsc = this._postService.getCategoriesMap().subscribe((catPairs: string[]) => {
            for (const catsPair in catPairs) {
              const cat: Category = {
                persian: catPairs[catsPair],
                english: catsPair
              }
              this.categories.push(cat)
            }
  
          })
        }
        const cat=this.categories.find((category:Category)=>{
          return category.english===this.englishTitle;
        })
        this.title=cat.persian;
        
      })
    });

  }
  ngOnDestroy(){
    this.catSubsc && this.catSubsc.unsubscribe();
  }
}
