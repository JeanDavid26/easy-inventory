import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDetailComponent } from './pages/dashboard-detail/dashboard-detail.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    DashboardDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
