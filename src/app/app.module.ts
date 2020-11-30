import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileDetailComponent} from './profile/profile-detail/profile-detail.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostComponent} from './share/post/post.component';
import {EnterComponent} from './auth/enter/enter.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UploadPostComponent} from './upload-post/upload-post.component';
import {DropdownDirective} from './share/dropdown.directive';
import {ClipboardModule} from 'ngx-clipboard';
import {HttpClientModule, HTTP_INTERCEPTORS, ɵHttpInterceptingHandler} from '@angular/common/http';
import {AuthInterceptorInterceptor} from './auth/auth-interceptor.interceptor';
import {SearchComponent} from './search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './header/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    ProfileComponent,
    ProfileDetailComponent,
    ProfileEditComponent,
    PostDetailComponent,
    PostComponent,
    EnterComponent,
    RegisterComponent,
    UploadPostComponent,
    DropdownDirective,
    SearchComponent,
    SearchResultComponent,
    MainNavComponent,
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
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
