import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule

import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

const routes: Routes = [
  {
    path:'',
    component: MapComponent
  },
];

@NgModule({
  declarations: [
    MapComponent,
    DashboardComponent,
    InfoPanelComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
