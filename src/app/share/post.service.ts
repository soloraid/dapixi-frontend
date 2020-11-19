import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getLatestPost() {
     return this.http.get(environment.api + '/photo/latest/posts');
  }

  getPostByID(id: string) {
    return this.http.get(environment.api + '/photo/posts/' + id);
  }

  getPostByUserName(userName: string) {
    return this.http.get(environment.api + '/photo/search/posts', {
      params: {
        user: userName
      }
    });
  }
}


