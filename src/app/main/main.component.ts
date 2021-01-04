import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../share/loader/loader.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";
import { Tokens } from '../share/tokens.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  profileSubs:Subscription
  constructor(public loaderService: LoaderService, private route: ActivatedRoute
    , private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      if (data['tokens']) {
        let token:Tokens=data['tokens'];
        this.auth.authState.next(token);
        this.router.navigate(['home'], {relativeTo: this.route});
        console.log(token);
      }
    });
  }

}
