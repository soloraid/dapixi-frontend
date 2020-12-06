import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BindingForm } from '@angular/compiler/src/compiler_util/expression_converter';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private _router: Router) {
  }

  getLatestPost(number: number = 50, page: number = 0) {
    let params = new HttpParams();
    params = params.append('size', String(number));
    params=params.append('page',String(page));
    return this.http.get(environment.api + '/photo/latest/posts', {
      params: params
    });
  }

  getCategories() {
    return this.http.get(environment.api + '/photo/categories');
  }

  addPsot(file: File, title: string, description: string) {
    let body = new FormData();
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

  getPostByUserName(userName: string) {
    return this.http.get(environment.api + '/photo/search/posts', {
      params: {
        user: userName
      }
    });

  }
}


