import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';


const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'auth',
    loadChildren:() =>
      import('./auth/auth.module').then(
        m => m.AuthModule
      )
  },
  {
    path:'info',
    loadChildren:() =>
      import('./info/info.module').then(
        m => m.InfoModule
      )
  },
  {
    path:'post-detail/:id',
    loadChildren:() => 
      import('./post-detail/post-detail.module').then(
        m => m.PostDetailModule
      )
  },
  {
    path:'user',
    loadChildren:() => 
    import('./profile/profile.module').then(
      m => m.ProfileModule
    )
  },
  {
    path:'search-result',
    loadChildren:() => 
    import('./search/search-result/search-result.module').then(
      m => m.SearchResultModule
    )
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
