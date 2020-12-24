import {Component, Input, OnInit} from '@angular/core';
import {Post} from './post.module';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input() post: Post;
  postUrl: string;
  isEmpty = true;
  id: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (this.post) {
      this.postUrl = environment.api + '/photo' + this.post.imageUrl;
      this.isEmpty = false;
    }
    if(this.post.title.length>20){
      this.post.title=this.post.title.slice(0,20).concat('...')
    }

  }

  navigateToDetail(): void {
    this.router.navigate(['/post-detail', this.post.id]);
  }


}
