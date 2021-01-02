import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {PostService} from '../share/post.service';
import {SearchService} from './search.service';
import {Post} from '../share/post/post.module';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchInput: string;

  constructor(private postService: PostService,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  username(): void {
    this.router.navigate(['/search-result/username', this.searchInput]);
  }

  category(): void {
    const queryParams: any = {};
    queryParams.myArray = JSON.stringify([this.searchInput]);
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    // this.searchService.searchByCategories(categories).subscribe();
    this.router.navigate(['/search-result/category'], navigationExtras);
  }

  advance(): void {

  }

  title(): void {
    this.router.navigate(['/search-result/title', this.searchInput]);
  }
}
