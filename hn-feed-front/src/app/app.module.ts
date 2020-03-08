import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HttpClientModule } from "@angular/common/http";
import { AppService } from './app.service'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
