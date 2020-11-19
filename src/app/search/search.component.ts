import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostService} from '../share/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchUser: string;


  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSearch(): void {
    this.router.navigate(['/search-result', this.searchUser]);
  }
}
