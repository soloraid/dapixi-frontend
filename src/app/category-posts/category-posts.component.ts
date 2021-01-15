import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from '../share/loader/loader.service';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.scss']
})
export class CategoryPostsComponent implements OnInit {
  title:string;
  routSubs:Subscription
  constructor(public loaderService:LoaderService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.routSubs=this._route.params.subscribe(()=>{
      this.title=this._route.snapshot.params.title;
    })
  }

}
