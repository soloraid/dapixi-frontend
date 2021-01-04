import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../share/user/user.mudole';
import {ProfileService} from '../../profile/profile.service';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';
import {SearchService} from '../search.service';
import {LoaderService} from '../../share/loader/loader.service';
import {Subscription} from 'rxjs';
import {Post} from '../../share/post/post.module';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  users: User[];
  userName: string;
  sub: Subscription;
  p = 1;
  firstLoad = true;
  isEmpty = true;
  postView: Post[] = [];
  title: string;
  categories: string[];
  isEmptyUsers = true;
  isEmptyPosts = true;


  constructor(private searchService: SearchService, private route: ActivatedRoute,
              private profileService: ProfileService,
              public loaderService: LoaderService) {
  }


  ngOnInit(): void {
    this.route.data.subscribe((data ) => {
      switch (data.name) {
        case 'username':
          this.getUsers();
          break;
        case 'category':
          this.getCategories();
          break;
        case 'title':
          this.getByTitle();
      }
    });

  }

  private getUsers(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      this.userName = params.get('name');
      this.searchService.searchByUsername(this.userName).subscribe((users: User[]) => {
        // tslint:disable-next-line:forin
        for (const index in users) {
          this.profileService.getProfilePic(users[index].username).subscribe((picData: PictureData) => {
              users[index].profileImageUrl = environment.api + '/photo/' + picData.imageUrl;
            },
            (errorData: HttpErrorResponse) => {
              users[index].profileImageUrl = '../../../assets/avatar-default.png';
            });
        }
        this.users = users;
        if (users.length > 0) {
          this.isEmptyUsers = false;
          this.isEmpty = false;
        } else {
          this.isEmptyUsers = true;
          this.isEmpty = true;
        }
      });
    });
  }

  private getCategories(): void {
    const categories = this.route.snapshot.queryParamMap.get('myArray');
    this.categories = JSON.parse(categories);
    this.sub = this.searchService.searchByCategories(this.categories, 9).subscribe((posts: Post[]) => {
      this.postView = [];
      this.postView = posts;
      this.firstLoad = false;
      if (this.postView.length > 0) {
        this.isEmptyPosts = false;
        this.isEmpty = false;
      } else {
        this.isEmptyPosts = true;
      }
    });
  }

  private getByTitle(): void {

    this.sub = this.route.paramMap.subscribe(params => {
      this.title = params.get('title');
      this.searchService.searchByTitle(this.title, 9).subscribe((posts: Post[]) => {
        this.postView = [];
        this.postView = posts;
        if (this.postView.length > 0) {
          this.isEmptyPosts = false;
          this.isEmpty = false;
        } else {
          this.isEmptyPosts = true;
          this.isEmpty = true;
        }
        this.firstLoad = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

interface PictureData {
  username: string;
  imageUrl: string;
}
