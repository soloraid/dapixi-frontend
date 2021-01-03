import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../share/loader/loader.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import { ProfileService } from '../profile/profile.service';
import { Subscription } from 'rxjs';
import { User } from '../share/user/user.mudole';
import { Tokens } from '../share/tokens.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loaderService: LoaderService, private route: ActivatedRoute
    , private auth: AuthService, private router: Router
    ,private _profileService:ProfileService) {
  }
  profileSubs:Subscription;
  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      if (data['tokens']) {
        let token:Tokens=data['token'];
        this.profileSubs=this._profileService.getProfile().subscribe((user:User)=>{
          token.username=user.username;
          this.auth.authState.next(data['tokens']);
          this.router.navigate(['home'], {relativeTo: this.route});
        })
      }
      // console.log(data['tokens']);
    });
  }

}
