import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxAutoScroll} from "ngx-auto-scroll/lib/ngx-auto-scroll.directive";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxAutoScroll
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
