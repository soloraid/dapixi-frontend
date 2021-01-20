import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {throwError} from 'rxjs';
import { Category } from './category.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private categoriesPairs:Category[]=[];
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

    return this.http.get(environment.api + '/photo/hot/posts', {
      params
    });
  }

  getCategories() {
    return this.http.get(environment.api + '/photo/categories');
  }

  getCategoriesPairs(){
    if(this.categoriesPairs.length>0){
      return this.categoriesPairs.slice();
    }else{
      this.getCategoriesMap();
    }
  }
  getCategoriesMap() {
    return this.http.get(environment.api + '/photo/categories/persian').pipe(
      tap(categoriesMap=>{
        
        for(const catName in categoriesMap){
          const newCat:Category={
            english:catName,
            persian:categoriesMap[catName]
          }
          this.categoriesPairs.push(newCat);
        }
      })
      );
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
    return this.http.post(environment.api+'/photo/comments/posts',comment);
  }
  getComments(id: string, num: number = 50, page: number = 0){
    let params = new HttpParams();
    params = params.append('size', String(num));
    params = params.append('page', String(page));
    params = params.append('photoId', id);
    return this.http.get(environment.api + '/photo/comments/posts', {
      params
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
  deletePost(id:string){
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.delete(environment.api + '/photo/posts/'+id);
  }

  deleteComment(id: string): any {
    let params = new HttpParams();
    params = params.append('commentId', id);
    return this.http.delete(environment.api + '/photo/comments/posts' ,  {
      params
    });
  }
}


