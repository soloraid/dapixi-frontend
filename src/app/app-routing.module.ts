import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EnterComponent } from './auth/enter/enter.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
