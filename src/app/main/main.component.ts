import {Component, OnInit} from '@angular/core';
import {LoaderService} from '../share/loader/loader.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loaderService: LoaderService, private route: ActivatedRoute
    , private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      if (data['tokens']) {
        this.auth.authState.next(data['tokens']);
      }
      console.log(data['tokens']);
    });
    this.router.navigate(['home'], {relativeTo: this.route});
  }

}
