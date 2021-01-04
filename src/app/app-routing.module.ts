import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EnterComponent } from './auth/enter/enter.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadPostComponent } from './upload-post/upload-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { AuthGuard } from './share/auth.guard';
import { ReAuthGuard } from './share/re-auth.guard';
import { ResetComponent } from './auth/reset/reset.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { MoreComponent } from './more/more.component';
import { ConfirmComponent } from './auth/confirm/confirm.component';
import { InfoComponent } from './info/info.component';
import { CommentComponent } from './comment/comment.component';
import { MainComponent } from './main/main.component';
import { FollowPostsComponent } from './follow-posts/follow-posts.component';
import { RecomendedPostsComponent } from './recomended-posts/recomended-posts.component';
import { HotPostsComponent } from './hot-posts/hot-posts.component';
import { ThirdPartyOAuthSSOService } from './third-party-oauth-sso.service';
import {FollowComponent} from './profile/follow/follow.component';


const routes: Routes = [
  // {
  //   path: '',
  //   // pathMatch: 'full',
  //   component: MainComponent,
  //   resolve: { tokens: ThirdPartyOAuthSSOService },
  //   children: [
  //     {
  //       path: '',
  //       pathMatch: 'full',
  //       // component: MainComponent
  //       redirectTo: 'home'
  //     },
  //     {
  //       path: 'home',
  //       component: HomeComponent
  //     },
  //     {
  //       path: 'follow',
  //       component: FollowPostsComponent,
  //       canActivate: [AuthGuard]
  //     },
  //     {
  //       path: 'recommend',
  //       component: RecomendedPostsComponent,
  //       canActivate: [AuthGuard]
  //     },
  //     {
  //       path: 'hot',
  //       component: HotPostsComponent,
  //     }
  //   ]
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  // },
  {
    path: 'comment',
    component: CommentComponent,
  },
  {
    path: 'more/:type',
    component: MoreComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent
  },
  {
    path: 'search-result',
    // component: SearchResultComponent,
    children: [
      {
        path: 'username/:name',
        component: SearchResultComponent,
        data: { name: 'username' }
      },
      {
        path: 'category',
        component: SearchResultComponent,
        data: { name: 'category' }
      },
      {
        path: 'title/:title',
        component: SearchResultComponent,
        data: { name: 'title' }
      },
    ]
  },

  {
    path: '404',
    component: Error404Component
  },
  {
    path: '500',
    component: Error500Component
  },
  // {
  //   path: '**',
  //   component: Error404Component
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
