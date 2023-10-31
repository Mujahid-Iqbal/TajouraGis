import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:'',
    component: AdminComponent
  },
  // {
  //   path:'detail',
  //   component: 
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AdminRoutingModule { }
