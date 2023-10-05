import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
// Import Mat Module
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoPanelComponent } from './info-panel/info-panel.component';

const routes: Routes = [
  
];

@NgModule({
  declarations: [
    MapComponent,
    DashboardComponent,
    InfoPanelComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgScrollbarModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    RouterModule.forChild(routes)
  ],
  exports: [InfoPanelComponent, MapComponent],
})
export class PagesModule { }
