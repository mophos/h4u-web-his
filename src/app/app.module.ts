import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
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
    ClarityModule.forRoot(),
    AdminModule,
    LoginModule,
    AuthModule,
    ManagerModule,
    AppRoutingModule,
  ],
  providers: [
    JwtHelper,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'API_CONSENTS_URL', useValue: environment.apiConsents },
    { provide: 'API_H4U_URL', useValue: environment.apiH4u },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
