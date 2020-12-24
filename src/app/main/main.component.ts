import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../share/loader/loader.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public loaderService:LoaderService) { }

  ngOnInit(): void {
  }

}
