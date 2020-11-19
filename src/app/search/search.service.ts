import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Post} from '../share/post/post.module';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  arrResult: Post[] = [];
  resultSubject = new Subject<Post []>();

  constructor(private http: HttpClient) {
  }

  searchData(userName: string) {
    return this.http.get(environment.api + '/photo/search/posts', {
      params: {
        user: userName
      }
    });
  }

  setResult(input: Post[]): void {
    this.resultSubject.next(input);
    this.arrResult = input;
  }

  getResult() {
    return this.arrResult;
  }
}
