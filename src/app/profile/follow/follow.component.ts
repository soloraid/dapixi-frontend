import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {User} from '../../share/user/user.mudole';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {LoaderService} from '../../share/loader/loader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit, OnDestroy {
  userFollowings: Data[] = [];
  userFollowers: Data[] = [];
  tempData: Data;
  username: string;
  followersSub: Subscription;
  followingsSub: Subscription;
  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.getFollowingFollower();
    this.profileService.followSub.subscribe((isChange: boolean) => {
      if (isChange) {
        this.getFollowingFollower();
      }
    });
  }

  private addUsersToArr(users: User[], method: string): void {
    // tslint:disable-next-line:forin
    for ( const index in users) {
      this.profileService.getProfilePic(users[index].username)
        .subscribe(
          (picData: Data) => {
            this.tempData = new Data();
            this.tempData.username = picData.username;
            if (picData.imageUrl.startsWith('/files')) {
              this.tempData.imageUrl = environment.api + '/photo/' + picData.imageUrl;
            } else {
              this.tempData.imageUrl = picData.imageUrl;
            }
            if ( method === 'followers') {
              this.userFollowers.push(this.tempData);
            }
            if ( method === 'followings') {
              this.userFollowings.push(this.tempData);
            }
          },
          (errorData: HttpErrorResponse) => {
            this.tempData = new Data();
            this.tempData.username = users[index].username;
            this.tempData.imageUrl = '../../../assets/avatar-default.png';
            if ( method === 'followers') {
              this.userFollowers.push(this.tempData);
            }
            if ( method === 'followings') {
              this.userFollowings.push(this.tempData);
            }
          }
        );
    }
  }

  private getFollowingFollower(): void {
    this.followersSub = this.profileService.getFollowers(this.username).subscribe( (followers: User[]) => {
      this.addUsersToArr(followers, 'followers');
    });
    this.followingsSub = this.profileService.getFollowings(this.username).subscribe( (followings: User[]) => {
      this.addUsersToArr(followings, 'followings');
    });
  }

  ngOnDestroy(): void {
    this.followersSub.unsubscribe();
    this.followingsSub.unsubscribe();
  }
}

class Data {
  username: string;
  imageUrl: string;
}
