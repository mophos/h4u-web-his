import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ManagerGuard } from './manager.guard';
import { OfficerComponent } from './officer/officer.component';

const routes: Routes = [
  {
    path: 'manager',
    component: LayoutComponent,
    canActivate: [ManagerGuard],
    children: [
      {
        path: '', redirectTo: 'officer', pathMatch: 'full'
      },
      {
        path: 'officer', component: OfficerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
