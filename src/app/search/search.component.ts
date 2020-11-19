import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {Post} from '../share/post/post.module';
import {Router} from '@angular/router';
import {PostService} from '../share/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchUser: string;


  constructor(private searchService: SearchService,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.router.navigate(['/search-result', this.searchUser]);
  }
}
