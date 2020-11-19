import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import { BindingForm } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getLatestPost() {
     return this.http.get(environment.api + '/photo/latest/posts');
  }
  getCategories(){
    return this.http.get(environment.api+'/photo/categories');
  }
  addPsot(file:File,title:string,description:string){
    let body=new FormData();
    body.append('file',file);
    body.append('title',title);
    body.append('description',description);
    return this.http.post(environment.api+'/photo/posts',body);

  }
}


