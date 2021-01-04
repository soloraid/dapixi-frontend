import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from "@angular/router";
import { MasonryPostsModule } from "src/app/share/masonry-posts/masonary-posts.module";
import { SearchResultComponent } from "./search-result.component";

@NgModule({
    declarations: [
        SearchResultComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MasonryPostsModule,
        RouterModule.forChild([
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
            }
        ])
    ]
})
export class SearchResultModule { }