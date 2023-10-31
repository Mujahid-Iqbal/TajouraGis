import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
// Import Mat Module
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { authGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [

  {
    path:'',
    loadChildren: ()=> import('./auth/auth.module').then(p=>p.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(p=>p.DashboardModule),
    canActivate: [authGuard]
  },
  {
    path:'admin-dashboard',
    loadChildren: ()=> import('./admin/admin.module').then(p=>p.AdminModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class PagesModule { }
