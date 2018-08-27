import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    ClarityModule,
    DirectivesModule
  ],
  providers: [LoginService],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
