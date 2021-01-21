import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent implements OnInit {
  title: string;

  constructor() { }

  ngOnInit(): void {
  }
}
