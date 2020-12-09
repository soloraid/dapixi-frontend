import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../share/post.service';
import {LoaderService} from '../share/loader/loader.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})

export class UploadPostComponent implements OnInit,OnDestroy {
  imgFile:File;
  title:string="";
  description:string="";
  //catOpen:boolean=false;
  @ViewChild('file_label') label:ElementRef;
  fileErr:boolean=false;
  allCats:category[];
  selectedCats:category[]=[];
  catSubsc:Subscription;
  uploadSubc:Subscription;
  addCatSubsc:Subscription;
  constructor(private _postService:PostService,private _router:Router, public loaderService: LoaderService) { }

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
  //   @HostListener('document:click',['$event']) closCat(event){
  //     console.log((<HTMLElement>event.target).tagName);
  //   if((<HTMLElement>event.target).tagName.){
  //     // this.catOpen=false;
  //   }
  // }
  onChange(event){
    console.log(event.target.files);

    const files=event.target.files;
    let labelStr="تصویری انتخاب نشده است";
    if(files.length){
      this.imgFile=event.target.files[0];
      // console.log(this.imgFile.type.startsWith('image'));
      if(this.imgFile.type.startsWith('image')){
        labelStr=this.imgFile.name;
      }else{
        this.imgFile=null;
        this.fileErr=true;
      }
    }
    this.label.nativeElement.innerHTML=labelStr;
    // console.log(this.label);
  }
  onSubmit(){
    console.log(this.imgFile,this.description,this.title);
    this.uploadSubc=this._postService.addPsot(this.imgFile,this.title,this.description)
    .subscribe((postData:PostData)=>{
      console.log(postData);
      let cats:string[]=this.selectedCats.map((cat)=>{
        return cat.name;
      })
      this.addCatSubsc=this._postService
      .addCategories(postData.id,cats)
      .subscribe((data)=>{
        console.log(data);
      })
      this._router.navigate(['./post-detail',postData.id]);
    })
    // console.log(this.selectedCats.length===0,Boolean(this.selectedCats))
  }
  addCat(id):boolean{
    console.log(id);
    // console.log(this.allCats[+index]);
    if(this.selectedCats.length<4){
      const index=this.allCats.findIndex((cat)=>{
        return cat.id===id;
      });
      console.log(index);
      this.allCats[index].selected=true;
      const selected={...this.allCats[index]};
      this.selectedCats.push(selected);
      console.log(this.selectedCats);
      return true;
    }else{
      return false;
    }
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
  ngOnDestroy(){
    if(this.addCatSubsc){
      this.addCatSubsc.unsubscribe();
    }
    if(this.catSubsc){
      this.catSubsc.unsubscribe();
    }
    if(this.uploadSubc){
      this.uploadSubc.unsubscribe();
    }
  }
  // toggleCats(){
  //   this.catOpen=!this.catOpen;
  // }

}
interface category{
  id:number;
  name:string;
  selected:boolean;
}
interface PostData {
  id: string;
  username: string;
  title: string;
  description: string;
  creationDate: string;
  imageUrl: string;
  userRating: number;
  averageRating: number;
  categories: string[];
}
