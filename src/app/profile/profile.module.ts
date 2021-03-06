import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { AuthGuard } from '../share/auth.guard';
import { DropdownDirective } from '../share/dropdown.directive';
import { MasonryPostsModule } from '../share/masonry-posts/masonary-posts.module';
import { UploadPostComponent } from '../upload-post/upload-post.component';
import { FollowComponent } from './follow/follow.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionComponent } from './collections/collection/collection.component';
import { NewCollectionComponent } from './collections/new-collection/new-collection.component';
import {CarouselModule, WavesModule} from 'angular-bootstrap-md';
import {PipeModule} from '../share/pipes/pipe.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
        ProfileEditComponent,
        FollowComponent,
        UploadPostComponent,
        DropdownDirective,
        CollectionsComponent,
        CollectionComponent,
        NewCollectionComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatMenuModule,
        // DropdownDirective,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTabsModule,
        MatStepperModule,
        MasonryPostsModule,
        ClipboardModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        CarouselModule,
        WavesModule,
        PipeModule,
        MatSnackBarModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProfileComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'profile',
                        pathMatch: 'full',
                        component: ProfileComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'profile',
                        component: ProfileDetailComponent,
                        canActivate: [AuthGuard]
                        // children:[
                        //   {
                        //     path:'edit',
                        //     component:ProfileEditComponent
                        //   }
                        // ]
                    },
                    {
                        path: 'profile/edit',
                        component: ProfileEditComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'new',
                        component: UploadPostComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: ':username',
                        component: ProfileDetailComponent
                    },             {
                        path: ':username/following-follower',
                        component: FollowComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                      path: 'profile/collections',
                      component: CollectionsComponent,
                      canActivate: [AuthGuard]
                    },
                    {
                      path: 'profile/collections/:name/:id',
                      component: CollectionComponent,
                      canActivate: [AuthGuard]
                    },
                ]
            }
        ])
    ]
})
export class ProfileModule { }
