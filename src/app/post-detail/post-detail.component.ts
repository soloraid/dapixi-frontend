import {Component, OnInit} from '@angular/core';
import {Post} from '../share/post/post.module';
import {environment} from '../../environments/environment.prod';
import {PostService} from '../share/post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  id: string;
  postUrl: string;
  isEmpty = true;
  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.postService.getPostByID(this.id).subscribe((post: Post) => {
      this.postUrl = environment.api + '/photo' + post.imageUrl;
      this.post = post;
      this.isEmpty = false;
    });
  }

}
