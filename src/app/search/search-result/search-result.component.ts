import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../share/post.service';
import {User} from '../../share/user/user.mudole';
import {ProfileService} from '../../profile/profile.service';
import {environment} from '../../../environments/environment.prod';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  users: User[];
  userName: string;
  isEmptyUsers = true;
  p = 1;


  constructor(private postService: PostService, private route: ActivatedRoute, private profileService: ProfileService) {
  }


  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.userName = params.name;
      this.postService.getProfileByUserName(this.userName).subscribe((users: User[]) => {
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
        if (users.length !== 0) {
          this.isEmptyUsers = false;
        } else {
          this.isEmptyUsers = true;
        }
      });
    });

  }
}

interface PictureData {
  username: string;
  imageUrl: string;
}
