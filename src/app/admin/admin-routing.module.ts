import { ConsentComponent } from './consent/consent.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '../services/authguard.service';
import { OfficerComponent } from '../manager/officer/officer.component';
import { ManagerGuard } from '../manager/manager.guard';
import { ProfileComponent } from './profile/profile.component';
import { NreferComponent } from './nrefer/nrefer.component';
import { IsOnlineComponent } from './is-online/is-online.component';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'nrefer', component: NreferComponent },
      { path: 'is', component: IsOnlineComponent },
      { path: 'queue', component: QueueComponent },
      { path: 'consent', component: ConsentComponent }
    ]
  },
  {
    path: 'member',
    component: LayoutComponent,
    canActivate: [ManagerGuard],
    children: [
      { path: '', redirectTo: 'officer', pathMatch: 'full' },
      { path: 'officer', component: OfficerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
