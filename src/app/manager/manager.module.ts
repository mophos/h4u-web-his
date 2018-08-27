import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { ManagerRoutingModule } from './manager-routing.module';
import { DirectivesModule } from '../directives/directives.module';
import { LayoutComponent } from './layout/layout.component';
import { OfficerComponent } from './officer/officer.component';
import { ManagerGuard } from './manager.guard';
import { StaffService } from '../services/staff.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    DirectivesModule,
    ManagerRoutingModule
  ],
  declarations: [
    LayoutComponent,
    OfficerComponent
  ],
  providers: [
    ManagerGuard,
    StaffService
  ]
})
export class ManagerModule { }
