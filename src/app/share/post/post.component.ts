import {Component, Input, OnInit} from '@angular/core';
import {Post} from './post.module';
import {environment} from '../../../environments/environment';
import { Router} from '@angular/router';

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
      const english:RegExp=new RegExp('.*[a-zA-Z0-9].*');
      if(english.test(this.post.title)){
        this.post.title=this.post.title.slice(0,20).concat('...')
      }else{
        this.post.title='...'.concat(this.post.title.slice(0,20));

      }
    }

  }

  navigateToDetail(): void {
    this.router.navigate(['/post-detail', this.post.id]);
  }


}
