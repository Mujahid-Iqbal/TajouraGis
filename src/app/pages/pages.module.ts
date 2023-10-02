import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { ChooseMapComponent } from './choose-map/choose-map.component';
import { NearByComponent } from './near-by/near-by.component';

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
    InfoPanelComponent,
    ChooseMapComponent,
    NearByComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  exports: [InfoPanelComponent, NearByComponent],
})
export class PagesModule { }
