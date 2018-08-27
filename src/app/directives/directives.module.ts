import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { MemberService } from '../services/member.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  declarations: [
    RegisterModalComponent,
    LoadingModalComponent
  ],
  exports: [
    RegisterModalComponent,
    LoadingModalComponent
  ],
  providers: [
    MemberService
  ]
})
export class DirectivesModule { }
