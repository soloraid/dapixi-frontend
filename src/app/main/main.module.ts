import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { CategoryPostsComponent } from "../category-posts/category-posts.component";
import { Error404Component } from "../error404/error404.component";
import { FollowPostsComponent } from "../follow-posts/follow-posts.component";
import { HomeComponent } from "../home/home.component";
import { HotPostsComponent } from "../hot-posts/hot-posts.component";
import { RecomendedPostsComponent } from "../recomended-posts/recomended-posts.component";
import { AuthGuard } from "../share/auth.guard";
import { MasonryPostsModule } from "../share/masonry-posts/masonary-posts.module";
import { ThirdPartyOAuthSSOService } from "../third-party-oauth-sso.service";
import { MainComponent } from "./main.component";

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    FollowPostsComponent,
    RecomendedPostsComponent,
    CategoryPostsComponent,
    HotPostsComponent
  ],
  imports: [
    CommonModule,
    MasonryPostsModule,
    MatProgressSpinnerModule,
    RouterModule.forChild([
      {
        path: '',
        // pathMatch: 'full',
        component: MainComponent,
        resolve: { tokens: ThirdPartyOAuthSSOService },
        children: [
          {
            path: '',
            pathMatch: 'full',
            // component: MainComponent
            redirectTo: 'home'
          },
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'follow',
            component: FollowPostsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'recommend',
            component: RecomendedPostsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'hot',
            component: HotPostsComponent,
          },
          {
            path: 'categories/:title',
            component: CategoryPostsComponent
          },
          {
            path: '**',
            component: Error404Component
          }
        ]
      },
    ])
  ]
})
export class MainModule { }