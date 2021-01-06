import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-picture',
  templateUrl: './full-picture.component.html',
  styleUrls: ['./full-picture.component.scss']
})
export class FullPictureComponent implements OnInit {
  @Input() src:string;
  constructor() { }

  ngOnInit(): void {
  }

}
