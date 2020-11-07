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
      id:2,
      name:"منظره",
      selected:false
    }
  ];
  selectedCats:category[]=[];
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
  addCat(id){
    console.log(id);
    // console.log(this.allCats[+index]);
    const index=this.allCats.findIndex((cat)=>{
      return cat.id===id;
    });
    console.log(index);
    this.allCats[index].selected=true;
    const selected={...this.allCats[index]};
    this.selectedCats.push(selected);
    console.log(this.selectedCats);
  }
  removeCat(index){
    let id=this.selectedCats[index].id;
    this.selectedCats.splice(index,1);
    const changeCat=this.allCats.find((c)=>{
      return c.id===id;
    });
    console.log(changeCat);
    changeCat.selected=false;
  }

}
interface category{
  id:number;
  name:string;
  selected:boolean;
}