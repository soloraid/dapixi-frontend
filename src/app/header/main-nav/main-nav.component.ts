import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Tokens } from '../../share/tokens.model';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile/profile.service';
import { environment } from '../../../environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from 'src/app/share/post.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Category } from 'src/app/share/category.type';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss',]
})
export class MainNavComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  imageUrl: string;
  authSubsc: Subscription;
  pictureSubs: Subscription;
  catSubsc: Subscription;
  categories: Category[]=[];
  catShow: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 860px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );
  isHandset$2: Observable<boolean> = this.breakpointObserver.observe('(max-width: 689px)')
    .pipe(
      map(result => result.matches),
      shareReplay(),
    );

  // tslint:disable-next-line:variable-name
  private username: string;

  private _transformer = (node: tree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.title,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  constructor(private breakpointObserver: BreakpointObserver,
    private _authService: AuthService,
    private _router: Router,
    private profileService: ProfileService,
    private _postService: PostService) {
  }


  ngOnInit(): void {
    this.authSubsc = this._authService.authState.subscribe((token: Tokens) => {
      this.isAuth = !!token;
      if (this.isAuth) {
        this.username = token.username;
        this.getProfilePic();
      }
    });
    this.profileService.picSub.subscribe((isChange: boolean) => {
      if (isChange) {
        this.getProfilePic();
      }
    });

    if(this._postService.getCategoriesPairs()){
      this.categories=this._postService.getCategoriesPairs();
      this.dataSource.data =[
        {
          title:'دسته‌بندی‌ها',
          children:this.categories.map((cat:Category)=>{
            return {title:cat.persian}
          })
        }
      ] ;
    }else{
      this.catSubsc = this._postService.getCategoriesMap().subscribe((catPairs: string[]) => {
        // for(const catsPair in catPairs){
        //   const cat:Category={
        //     persian:catPairs[catsPair],
        //     english:catsPair
        //   }
        //   this.categories.push(cat)
        // }
        this.categories=this._postService.getCategoriesPairs();
        this.dataSource.data =[
          {
            title:'دسته‌بندی‌ها',
            children:this.categories.map((cat:category)=>{
              return {title:cat.persian}
            })
          }
        ] ;
  
      })

    }

  }

  private getProfilePic(): void {
    this.pictureSubs = this.profileService.getProfilePic(this.username)
      .subscribe(
        (picData: PictureData) => {
          if (picData.imageUrl.startsWith('/files')) {
            this.imageUrl = environment.api + '/photo/' + picData.imageUrl;
          } else {
            this.imageUrl = picData.imageUrl;
          }
          // this.profileService.picSub.next(true);
        },
        (errorData: HttpErrorResponse) => {
          this.imageUrl = '../../../assets/avatar-default.png';
        }
      );
  }

  onLogOut() {
    
    this._authService.logOut();
    const url = this._router.url;
    const guardedPages: string[] = [
      '/follow',
      '/recommend',
      '/hot',
      '/user/profile',
      '/user/profile/edit',
      '/user/new',
    ];
    const inGuarded = guardedPages.find((rout: string) => {
      return rout === url;
    });
    if (inGuarded || url.endsWith('following-follower')) {
      this._router.navigate(['/home']);
    }
  }

  onAuth(): void {
    this._router.navigate(['/auth'], { queryParams: { back: this._router.url } });
  }
  @HostListener('document:mousemove', ['$event']) toggling(event: MouseEvent) {
    // 
    // 
    const path: [] = event['path'];
    const inCat = path.some((element) => {
      const pathElement: HTMLElement = (<HTMLElement>element);
      return (pathElement.id === 'cat-btn' || pathElement.id === 'cat-menu');
    })
    // 
    if (this.catShow) {
      if (!inCat) {
        this.catShow = false;
      }
    } else {
      if (inCat) {
        // 
        this.catShow = true;
      }
    }

  }
  selectCatFromBig(index:number){
    this.catShow=false;
    this._router.navigate(['categories',this.categories[index].english]);
  }
  selectCatfromSideNav(node){
    
    const catObject=this.categories.find((cat:Category)=>{
      return cat.persian === node.name;
    })
    this._router.navigate(['categories',catObject.english]);
  }
  ngOnDestroy(): void {
    this.authSubsc.unsubscribe();
    this.pictureSubs.unsubscribe();
    this.catSubsc.unsubscribe();
  }

  onRegister(): void {
    this._router.navigate(['/auth/register'], { queryParams: { back: this._router.url } });
  }
}

interface PictureData {
  username: string;
  imageUrl: string;
}
interface tree {
  title: string;
  children?: tree[];
}
interface ExampleFlatNode {
  expandable: boolean;
  name: string;

  level: number;
}
interface category{
  persian:string,
  english:string
}
