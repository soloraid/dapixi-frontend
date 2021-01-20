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
  @ViewChild('file_label') label:ElementRef;
  fileErr:boolean=false;
  allCats:category[]=[];
  selectedCats:category[]=[];
  catSubsc:Subscription;
  // catMap:Map<string,string>=new Map();
  uploadSubc:Subscription;
  addCatSubsc:Subscription;
  // tempSubs:Subscription;
  constructor(private _postService:PostService,private _router:Router, public loaderService: LoaderService) { }

  ngOnInit(): void {
    this.catSubsc=this._postService.getCategoriesMap().subscribe((catPairs)=>{
      let counter=0;
      for(const catPair in catPairs){
        // this.catMap.set(catPair,catPairs[catPair]);
        const newCat:category={
          id: counter,
          persian: catPairs[catPair],
          english: catPair,
          selected:false
        }
        this.allCats.push(newCat);
        counter++;
      }
      console.log(this.allCats);
    })
    // this.catSubsc=this._postService.getCategories().subscribe((cats:string[])=>{
    //   this.allCats=cats.map((cat,index):category=>{
    //     const newCat:category={
    //       id:index,
    //       name:cat,
    //       selected:false
    //     }
    //     return  newCat
    //   });
    // })
  }

  onChange(event){

    const files=event.target.files;
    let labelStr="تصویری انتخاب نشده است";
    if(files.length){
      this.imgFile=event.target.files[0];
      if(this.imgFile.type.startsWith('image')){
        labelStr=this.imgFile.name;
      }else{
        this.imgFile=null;
        this.fileErr=true;
      }
    }
    this.label.nativeElement.innerHTML=labelStr;
  }
  onSubmit(){
    this.uploadSubc=this._postService.addPsot(this.imgFile,this.title,this.description)
    .subscribe((postData:PostData)=>{
      let cats:string[]=this.selectedCats.map((cat)=>{
        return cat.english;
      })
      this.addCatSubsc=this._postService
      .addCategories(postData.id,cats)
      .subscribe((data)=>{
        this._router.navigate(['./post-detail',postData.id]);
      })
    })
  }
  addCat(id):boolean{
    if(this.selectedCats.length<4){
      const index=this.allCats.findIndex((cat)=>{
        return cat.id===id;
      });
      this.allCats[index].selected=true;
      const selected={...this.allCats[index]};
      this.selectedCats.push(selected);
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


}
interface category{
  id:number;
  persian:string;
  english:string;
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
