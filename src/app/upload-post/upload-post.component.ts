import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../share/post.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})

export class UploadPostComponent implements OnInit {
  imgFile:File;
  title:string;
  description:string;
  @ViewChild('file_label') label:ElementRef;
  allCats:category[];
  selectedCats:category[]=[];
  catSubsc:Subscription;
  constructor(private _postService:PostService) { }

  ngOnInit(): void {
    this.catSubsc=this._postService.getCategories().subscribe((cats:string[])=>{
      console.log(cats);
      this.allCats=cats.map((cat,index):category=>{
        const newCat:category={
          id:index,
          name:cat,
          selected:false
        }
        return  newCat
      });
      console.log(this.allCats);
    })
  }
  onChange(event){
    console.log(event.target.files[0]);
    this.imgFile=event.target.files[0];
    // console.log(this.label);
    this.label.nativeElement.innerHTML=this.imgFile.name;
  }
  onSubmit(){
    console.log(this.imgFile,this.description,this.title);
    // this._postService.addPsot(this.imgFile,this.)
    // console.log(this.selectedCats.length===0,Boolean(this.selectedCats))
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