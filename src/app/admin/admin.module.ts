import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from '../services/home.service';
import { AuthGuardService } from '../services/authguard.service';

import { ToThaiDatePipe } from '../to-thai-date.pipe';
import { TimestampToThaiDatePipe } from '../timestamp-to-thai-date.pipe';
import { AlertService } from '../services/alert.service';
import { StatusPipe } from '../pipe/status.pipe';
import { DetailRequestComponent } from './datagrid/detail-request/detail-request.component';
import { ServiceService } from '../services/service.service';
import { ToThaiDateTimePipe } from '../to-thai-date-time.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ClarityModule
  ],
  providers: [HomeService, AuthGuardService, AlertService, ServiceService],
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HomeComponent,
    ToThaiDatePipe,
    TimestampToThaiDatePipe,
    ToThaiDateTimePipe,
    StatusPipe,
    DetailRequestComponent
  ],
  exports: [
    DetailRequestComponent
  ]
})
export class AdminModule { }
