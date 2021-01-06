import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { CommentComponent } from "../comment/comment.component";
import { ConfirmDialogComponent } from "../share/confirm-dialog/confirm-dialog.component";
import { FullPictureComponent } from "../share/full-picture/full-picture.component";
import { PostDetailComponent } from "./post-detail.component";

@NgModule({
    declarations: [
        ConfirmDialogComponent,
        PostDetailComponent,
        CommentComponent,
        FullPictureComponent
    ],
    imports: [
        CommonModule,
        MatProgressBarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: PostDetailComponent
            }
        ])
    ]
})
export class PostDetailModule { }