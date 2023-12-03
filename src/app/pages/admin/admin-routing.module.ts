import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TajouraDataComponent } from './tajoura-data/tajoura-data.component';

const routes: Routes = [
  {
    path:'',
    component: AdminComponent
  },
  {
    path:'school',
    component: TajouraDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
