import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {Post} from '../../share/post/post.module';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  posts: Post[] = [];
  isEmptyPosts = true;
  p = 1;

  constructor(private searchService: SearchService) { }


  ngOnInit(): void {
    this.searchService.resultSubject.subscribe(posts => {
      this.posts = posts;
      if (posts.length !== 0) {
        console.log(posts);
        this.isEmptyPosts = false;
      } else {
        this.isEmptyPosts = true;
      }
    });
  }
}
