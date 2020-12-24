import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private _router: Router) {
  }

  getLatestPost(number: number = 50, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', String(number));
    params = params.append('page', String(page));
    return this.http.get(environment.api + '/photo/latest/posts', {
      params
    });
  }

  getFollowedPost(number: number = 50, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', String(number));
    params = params.append('page', String(page));
    return this.http.get(environment.api + '/photo/followed/posts', {
      params
    });
  }

  getHighRatedPost(number: number = 50, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', String(number));
    params = params.append('page', String(page));
    /*params = params.append('from', '2020-10-1');
    params = params.append('to', '2020-12-9');*/
    return this.http.get(environment.api + '/photo/hot/posts', {
      params
    });
  }

  getCategories() {
    return this.http.get(environment.api + '/photo/categories');
  }

  addPsot(file: File, title: string, description: string) {
    const body = new FormData();
    body.append('file', file);
    body.append('title', title);
    body.append('description', description);
    return this.http.post(environment.api + '/photo/posts', body);

  }

  addCategories(id: string, cats: string[]) {
    return this.http.patch(environment.api + '/photo/posts/' + id + '/categories', cats);
  }

  getPostByID(id: string) {
    return this.http.get(environment.api + '/photo/posts/' + id)
      .pipe(
        catchError((errData: HttpErrorResponse) => {
          console.log(errData);
          if (errData.status == 404) {
            this._router.navigate(['/404']);
          }
          return throwError(errData);
        })
      );
  }

  getProfileByUserName(userName: string) {
    return this.http.get(environment.api + '/user/search/u/'+userName);

  }

  getPostsByUsername(username:string,number: number = 50, page: number = 0){
    let params=new HttpParams();
    params=params.append('user',username);
    params = params.append('size', String(number));
    params = params.append('page', String(page));
    return this.http.get(environment.api+"/photo/posts/user",{
      params:params
    })
  }

  putRate(id: string, rating: string ) {
    const body = new FormData();
    body.append('rate', rating);
    return this.http.put(environment.api + '/photo/posts/' + id + '/ratings', body);
  }

  deleteRate(id: string) {
    return this.http.delete(environment.api + '/photo/posts/' + id + '/ratings/reset');
  }

  getUsersRatePost(id: string) {
    return this.http.get(environment.api + '/photo/posts/' + id + '/ratings/users');
  }

  uploadProfilePhoto(image: File) {
    let body = new FormData();
    body.append('file', image);
    return this.http.post( environment.api + '/photo/profile/picture', body);
  }
  addComment(id:string,content:string){
    const comment={
      photoId:id,
      content:content
    }
    // console.log('m',comment);
    return this.http.post(environment.api+'/photo/comments/posts',comment);
  }
  getComments(id:string){
    let params=new HttpParams();
    params=params.append('photoId',id);
    return this.http.get(environment.api+'/photo/comments/posts',{
      params:params
    });
  }

  getRecommenderPosts(number: number = 50, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', String(number));
    params = params.append('page', String(page));
    return this.http.get(environment.api + '/photo/recommended/posts', {
      params
    });
  }
}


