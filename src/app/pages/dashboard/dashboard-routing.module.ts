import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
  },
  // {
  //   path:'detail',
  //   component: 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
