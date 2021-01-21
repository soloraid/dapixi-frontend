import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FullPictureComponent} from '../../../share/full-picture/full-picture.component';
import {MatDialog} from '@angular/material/dialog';
import {Collection} from '../Collection.module';
import {ProfileService} from '../../profile.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../share/post.service';
import {Post} from '../../../share/post/post.module';
import {environment} from '../../../../environments/environment';
import {LoaderService} from '../../../share/loader/loader.service';
import {ConfirmDialogComponent} from '../../../share/confirm-dialog/confirm-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar/snack-bar-config';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, OnDestroy {
  collection: Collection;
  imageUrl: string;
  subsCollection: Subscription;
  subsGet: Subscription;
  id: string;
  title: string;
  isEmpty = false;
  errMessage = '';
  actMessage = 'x';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  subsPhoto: Subscription;
  collect: Collect[] = [];
  isPhoto: boolean = false;

  constructor(private  dialog: MatDialog, private profileService: ProfileService,
              private route: ActivatedRoute, private postService: PostService,
              public loaderService: LoaderService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.title = this.route.snapshot.params.name;
    this.getCollection(this.id);
  }

  showPicture(imageUrl: string): void {
    const baseWidth = document.documentElement.clientWidth;
    const padding = (15 * baseWidth) / screen.width;
    const dialogRef = this.dialog.open(FullPictureComponent,
      {
        maxWidth: baseWidth - padding,
        maxHeight: document.documentElement.clientHeight - 15
      }
    );
    dialogRef.componentInstance.src = imageUrl;
  }

  deletePhoto(collect: Collect): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.subsCollection = dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.profileService.deletePhotoOfCollection(this.id, collect.id).subscribe( () => {
          this.getCollection(this.id);
          this.errMessage = 'عکس مورد نظر حذف شد.';
          this.openSnackBar();
        }, (err: HttpErrorResponse) => {
          this.getCollection(this.id);
          this.errMessage = 'عکس قابل حذف نمی باشد.';
          this.openSnackBar();
        });
      }
    });
  }

  private getCollection(id: string): void {
    this.subsGet = this.profileService.getCollection(id).subscribe( (collection: Collection) => {
      this.collection = new Collection();
      this.collection = collection;
      if ( this.collection.photoIds.length > 0) {
        this.isEmpty = false;
        this.collect = [];
        // tslint:disable-next-line:forin
        for ( const item of this.collection.photoIds) {
          this.subsPhoto = this.postService.getPostByID(item).subscribe((post: Post) => {
            this.imageUrl = environment.api + '/photo' + post.imageUrl;
            const temp = new Collect(post.id, this.imageUrl);
            this.collect.push(temp);
            this.imageUrl = '';
          });
        }
      } else {
        this.isEmpty = true;
      }
    });
  }

  private openSnackBar(): void {
    this.snackBar.open(this.errMessage, this.actMessage, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      direction: 'rtl',
    });
  }

  ngOnDestroy(): void {
    if (this.subsCollection) {
      this.subsCollection.unsubscribe();
    }
    if (this.subsGet) {
      this.subsGet.unsubscribe();
    }
    if (this.subsPhoto) {
      this.subsPhoto.unsubscribe();
    }
  }
}

class Collect {
  id: string;
  imageUrl: string;

  constructor(id: string, imageUrl: string) {
    this.id = id;
    this.imageUrl = imageUrl;
  }
}
