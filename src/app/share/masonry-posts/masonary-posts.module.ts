import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxMasonryModule } from "ngx-masonry";
import { PostComponent } from "../post/post.component";
import { MasonryPostsComponent } from "./masonry-posts.component";

@NgModule({
    declarations:[
        MasonryPostsComponent,
        PostComponent
        
    ],
    imports:[
        NgxMasonryModule,
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports:[
        MasonryPostsComponent
    ]
})
export class MasonryPostsModule{}