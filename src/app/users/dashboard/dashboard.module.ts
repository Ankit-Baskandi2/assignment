import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
// import {MatCardModule} from '@angular/material/card';
// import {MatListModule} from '@angular/material/list';
// import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // MatCardModule,
    // MatListModule,
    // MatIconModule
  ]
})
export class DashboardModule { }
