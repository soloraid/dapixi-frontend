import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {
  imgFile:File;
  description:string;
  @ViewChild('file_label') label:ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event){
    console.log(event.target.files[0]);
    this.imgFile=event.target.files[0];
    // console.log(this.label);
    this.label.nativeElement.innerHTML=this.imgFile.name;

    
  }
  onSubmit(){
    console.log(this.imgFile,this.description);
  }

}
