import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    PagesModule,
    AngularFontAwesomeModule,
    AuthModule,

    AppRoutingModule,

    CarouselModule.forRoot(),

    BsDatepickerModule.forRoot(),

    BrowserAnimationsModule,

    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
