import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {Post} from '../share/post/post.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchUser: string;
  arrPosts: Post[] = [];


  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSearch(input: string): void {
    this.searchUser = input;
    // console.log(this.searchUser);
    this.searchService.searchData(this.searchUser).subscribe(posts => {

      // tslint:disable-next-line:forin
      for (let index in posts) {
        this.arrPosts.push(posts[index]);
      }
      this.searchService.setResult(this.arrPosts);
    });
    this.router.navigate(['/search/result']);
    this.searchUser = '';
    this.arrPosts = [];
  }
}
