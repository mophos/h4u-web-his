import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { environment } from '../environments/environment';

import 'clarity-icons';
import 'clarity-icons/shapes/all-shapes';

import { LoginModule } from './login/login.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { DeniedComponent } from './denied/denied.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PipeModule } from './pipe/pipe.module';

import { WebcamModule } from 'ngx-webcam';
@NgModule({
  declarations: [
    AppComponent,
    DeniedComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ClarityModule.forRoot(),
    AdminModule,
    LoginModule,
    AuthModule,
    ManagerModule,
    AppRoutingModule,
    PipeModule,
    WebcamModule
  ],
  providers: [
    JwtHelper,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
