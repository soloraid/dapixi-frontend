import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { InfoComponent } from "./info.component";

@NgModule({
    declarations: [
        InfoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([
            {
                path: 'info',
                component: InfoComponent
            }
        ])
    ]
})
export class InfoModule { }