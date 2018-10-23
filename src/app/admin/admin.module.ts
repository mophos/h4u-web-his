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
import { ProfileComponent } from './profile/profile.component';
import { DirectivesModule } from '../directives/directives.module';
import { NreferComponent } from './nrefer/nrefer.component';
import { IsOnlineComponent } from './is-online/is-online.component';
import { QueueComponent } from './queue/queue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ClarityModule,
    DirectivesModule
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
    DetailRequestComponent,
    ProfileComponent,
    NreferComponent,
    IsOnlineComponent,
    QueueComponent
  ],
  exports: [
    DetailRequestComponent
  ]
})
export class AdminModule { }
