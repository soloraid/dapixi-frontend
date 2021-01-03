
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule, MatSpinner } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { ConfirmDialogComponent } from "../share/confirm-dialog/confirm-dialog.component";
import { ReAuthGuard } from "../share/re-auth.guard";
import { AuthComponent } from "./auth.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { EnterComponent } from "./enter/enter.component";
import { RegisterComponent } from "./register/register.component";
import { ResetComponent } from "./reset/reset.component";
import { SocialsComponent } from "./socials/socials.component";

@NgModule({
    declarations: [
        AuthComponent,
        EnterComponent,
        RegisterComponent,
        ResetComponent,
        SocialsComponent,
        ConfirmComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        RouterModule.forChild(
            [
                {
                    path: 'auth',
                    component: AuthComponent,
                    canActivate: [ReAuthGuard],
                    // canActivateChild:[ReAuthGuard],
                    children: [
                      {
                        path: '',
                        // component:AuthComponent,
                        pathMatch: 'full',
                        redirectTo: 'enter',
                        canActivate: [ReAuthGuard],
                
                      },
                      {
                        path: 'enter',
                        component: EnterComponent,
                        canActivate: [ReAuthGuard],
                
                      },
                      {
                        path: 'register',
                        component: RegisterComponent,
                        canActivate: [ReAuthGuard],
                
                      },
                      {
                        path: 'reset',
                        component: ResetComponent,
                        canActivate: [ReAuthGuard],
                      }, {
                        path: 'confirm',
                        component: ConfirmComponent,
                        canActivate: [ReAuthGuard],
                
                      }
                    ]
                  },
            ]
        )
    ]
})
export class AuthModule { }