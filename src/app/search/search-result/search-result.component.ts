import {Component, OnInit} from '@angular/core';
import {Post} from '../../share/post/post.module';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../share/post.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  posts: Post[];
  userName: string;
  isEmptyPosts = true;
  p = 1;

  constructor(private postService: PostService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {

  //   this.route.params.subscribe((params) => {
  //     this.userName = params.name;
  //     this.postService.getPostByUserName(this.userName).subscribe((posts: Post[]) => {
  //       this.posts = posts;
  //       if (posts.length !== 0) {
  //         this.isEmptyPosts = false;
  //       } else {
  //         this.isEmptyPosts = true;
  //       }
  //     });
  //   });

   }

}

