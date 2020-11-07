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
  allCats:category[]=[
    {
      id:0,
      name:"انتزاعی",
      selected:false
    },
    {
      id:1,
      name:"تیره",
      selected:false
    },
    {
      id:0,
      name:"منظره",
      selected:false
    }
  ];
  selectedCAts:category[]=[];
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
  addCat(index){
    console.log(index);
    // console.log(this.allCats[+index]);
    this.allCats[index].selected=true;
    const selected={...this.allCats[index]};
    this.selectedCAts.push(selected);
    console.log(this.selectedCAts);
  }

}
interface category{
  id:number;
  name:string;
  selected:boolean;
}