import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,private _router:Router) { }

  searchByUsername(userName: string): any {
    return this.http.get(environment.api + '/user/search/u/' + userName);
  }

  searchByFirstLastname(firstname: string = '', lastname: string = ''): any {
    let params = new HttpParams();
    if (firstname !== '') {
      params = params.append('firstName', firstname);
    }
    if (lastname !== '') {
      params = params.append('lastName', lastname);
    }
    return this.http.get(environment.api + '/user/search/fl', {
      params
    });
  }

  searchByTitle(title: string, num: number = 50, page: number = 0 ): any {
    let params = new HttpParams();
    params = params.append('title', title);
    params = params.append('size', String(num));
    params = params.append('page', String(page));
    return this.http.get( environment.api + '/photo/search/posts/title', {
      params
    });
  }

  searchByCategories(categories: string[], num: number = 50, page: number = 0 ) {
    const category = new Category();
    category.categories = categories;
    
    
    let params = new HttpParams();
    params = params.append('size', String(num));
    params = params.append('page', String(page));
    return this.http.post( environment.api + '/photo/search/posts', category, {
      params
    } )
    .pipe(
      catchError((errData:HttpErrorResponse)=>{
        this._router.navigate(['404']);
        return throwError(errData);
      })
    );
  }


  searchByUsernameCategories(username: string, categories: string[], num: number = 50, page: number = 0 ): any {
    let params = new HttpParams();
    params = params.append('user' , username);
    params = params.append('size', String(num));
    params = params.append('page', String(page));
    const category = new Category();
    category.categories = categories;
    return this.http.post( environment.api + '/photo/search/posts/user' , category, {
      params
    });
  }
}

class Category {
  categories?: string[]|null;
}
