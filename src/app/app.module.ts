import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule }   from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthConnectComponent } from './auth-connect/auth-connect.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

import { ApiService } from './api.service'
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AuthConnectComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2BootstrapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB694dIrwnp4s9MrjrUi6w4_BEUvxh3FkU'
    }),
    RouterModule.forRoot([
      { path: 'auth/connect', component: AuthConnectComponent },
      { path: 'auth/callback/:serviceType', component: AuthCallbackComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', pathMatch: 'full', redirectTo: '/' },
      // { path: '**', component: PageNotFoundComponent }
      { path: '**', redirectTo: 'dashboard' }
    ])
  ],
  providers: [ApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
