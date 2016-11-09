import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB694dIrwnp4s9MrjrUi6w4_BEUvxh3FkU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
