import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor';
import { SearchComponent } from './search/search.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './header/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';
import { InterceptorService } from './share/loader/interceptor.service';

import { MatTooltipModule } from '@angular/material/tooltip';
import { CatchErrorInterceptor } from './catch-error.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MasonryPostsModule } from './share/masonry-posts/masonary-posts.module';
import { MainModule } from './main/main.module';
import { SearchResultModule } from './search/search-result/search-result.module';
import { PostDetailModule } from './post-detail/post-detail.module';
import { InfoModule } from './info/info.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    MainNavComponent,
    Error404Component,
    Error500Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatMenuModule,
    MatAutocompleteModule,
    // AuthModule,
    MasonryPostsModule,
    // ProfileModule,
    MainModule,
    SearchResultModule,
    // PostDetailModule,
    // InfoModule
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
