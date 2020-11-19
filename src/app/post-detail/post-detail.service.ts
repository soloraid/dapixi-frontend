import { Injectable } from '@angular/core';
import {Post} from '../share/post/post.module';

@Injectable({
  providedIn: 'root'
})
export class PostDetailService {
  post: Post;
  constructor() { }
}
