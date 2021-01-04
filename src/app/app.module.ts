import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './share/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploadPostComponent } from './upload-post/upload-post.component';
import { DropdownDirective } from './share/dropdown.directive';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { NgxPaginationModule } from 'ngx-pagination';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './header/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InterceptorService } from './share/loader/interceptor.service';
import { MoreComponent } from './more/more.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';

import { ConfirmComponent } from './auth/confirm/confirm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InfoComponent } from './info/info.component';
import { CommentComponent } from './comment/comment.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMasonryModule } from 'ngx-masonry';
import { MainComponent } from './main/main.component';
import { FollowPostsComponent } from './follow-posts/follow-posts.component';
import { RecomendedPostsComponent } from './recomended-posts/recomended-posts.component';
import { HotPostsComponent } from './hot-posts/hot-posts.component';
import { MasonryPostsComponent } from './share/masonry-posts/masonry-posts.component';
import { CatchErrorInterceptor } from './catch-error.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { FollowComponent } from './profile/follow/follow.component';
import { ConfirmDialogComponent } from './share/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MasonryPostsModule } from './share/masonry-posts/masonary-posts.module';
import { MainModule } from './main/main.module';
import { SearchResultModule } from './search/search-result/search-result.module';
import { PostDetailModule } from './post-detail/post-detail.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // ConfirmDialogComponent,
    // PostDetailComponent,
    // PostComponent,
    // UploadPostComponent,
    // DropdownDirective,
    SearchComponent,
    // SearchResultComponent,
    MainNavComponent,
    Error404Component,
    Error500Component,
    MoreComponent,
    InfoComponent,
    // CommentComponent,
    // MainComponent,
    // FollowPostsComponent,
    // RecomendedPostsComponent,
    // HotPostsComponent,
    // MasonryPostsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatStepperModule,
    NgxMasonryModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    AuthModule,
    MasonryPostsModule,
    ProfileModule,
    MainModule,
    SearchResultModule,
    PostDetailModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true
    }
  ],
  // exports:[
  //   DropdownDirective
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
