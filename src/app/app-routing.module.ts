import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EnterComponent } from './auth/enter/enter.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPostComponent } from './upload-post/upload-post.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import { profile } from 'console';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path: 'post-detail',
    component:  PostDetailComponent
  },
  {
    path:"auth",
    component:AuthComponent,
    children:[
      {
        path:"",
        // component:AuthComponent,
        pathMatch:'full',
        redirectTo:"enter"
      },
      {
        path:"enter",
        component:EnterComponent
      },
      {
        path:"register",
        component:RegisterComponent
      }
    ]
  },
  // {
  //   path:":id",
  //   component:ProfileComponent,
  //   children:[
  //     {
  //       path:"",
  //       pathMatch:"full",
  //       component:ProfileDetailComponent
  //     },
  //     {
  //       path:"edit",
  //       component:ProfileEditComponent
  //     },
  //     {
  //       path:"new",
  //       component:UploadPostComponent
  //     }
  //   ]
  // }
  {
    path:'user',
    component:ProfileComponent,
    children:[
      {
        path:'',
        redirectTo:'profile',
        pathMatch:'full'
      },
      {
        path:'profile',
        component:ProfileDetailComponent,
        // children:[
        //   {
        //     path:'edit',
        //     component:ProfileEditComponent
        //   }
        // ]
      },
      {
        path:'profile/edit',
        component:ProfileEditComponent
      },
      {
        path:':id',
        component:ProfileDetailComponent
      },
      {
        path:'new',
        component:UploadPostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
