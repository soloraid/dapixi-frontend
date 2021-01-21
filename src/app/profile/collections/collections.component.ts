import {Component, OnDestroy, OnInit} from '@angular/core';
import {Collection} from './Collection.module';
import {LoaderService} from '../../share/loader/loader.service';
import {ConfirmDialogComponent} from '../../share/confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NewCollectionComponent} from './new-collection/new-collection.component';
import {ProfileService} from '../profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar/snack-bar-config';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit, OnDestroy {
  isAuth = true;
  collections: Collection [] = [];
  isEmpty = true;
  isEdit: boolean[] = [];
  newTitle = '';
  subsColl: Subscription;
  showDialogSubs: Subscription;
  subsEdit: Subscription;
  errMessage = '';
  actMessage = 'x';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(public loaderService: LoaderService,
              private dialog: MatDialog,
              private profileService: ProfileService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCollections();
  }

  newCollection(): void {
    const dialogRef = this.dialog.open(NewCollectionComponent);
    this.showDialogSubs = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let createTitle = '';
        createTitle = result;
        this.profileService.createCollection(createTitle).subscribe( () => {
          this.getCollections();
          this.errMessage = 'کلکسیون ساخته شد!';
          this.openSnackBar();
        }, (errorData: HttpErrorResponse) => {
          this.errMessage = 'کلکسیونی به این نام موجود است!';
          this.openSnackBar();
        });
      }
    });
  }

  deleteCollection(CollectionId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.showDialogSubs = dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.profileService.deleteCollection(CollectionId).subscribe(() => {
          this.getCollections();
          this.errMessage = 'کلکسیون حذف شد!';
          this.openSnackBar();
        });
      }
    });
  }

  editCollection(CollectionId: string): void {
    this.subsEdit = this.profileService.editTitleCollection(CollectionId, this.newTitle).subscribe( () => {
      this.getCollections();
      this.errMessage = 'نام کلکسیون تغییر یافت.';
      this.openSnackBar();
    }, (errorData: HttpErrorResponse) => {
      this.errMessage = 'کلکسیونی به این نام موجود است!';
      this.openSnackBar();
    });
  }

  navigateToCollection(collection: Collection): void {
    this.router.navigate(['user/profile/collections', collection.title, collection.id]);
  }

  setEdit(edit: boolean, index: number): void {
    this.isEdit[index] = edit;
  }

  private getCollections(): void {
    this.subsColl = this.profileService.getCollections().subscribe((collections: Collection[]) => {
      this.collections = [];
      this.collections = collections.reverse();
      if (this.collections.length > 0) {
        this.isEmpty = false;
        for (const index in this.collections) {
          this.isEdit[index] = false;
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
    if (this.subsEdit) {
      this.subsEdit.unsubscribe();
    }
    if (this.subsColl) {
      this.subsColl.unsubscribe();
    }
    if (this.showDialogSubs) {
      this.showDialogSubs.unsubscribe();
    }
  }
}
