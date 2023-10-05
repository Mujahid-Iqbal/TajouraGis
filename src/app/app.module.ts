import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  // Existing routes
  {
    path: 'map',
    loadChildren: () =>
      import('./pages/pages.module').then(
        (m) => m.PagesModule
      ),
  },
  { path: '**', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    NgScrollbarModule,
    SharedModule,
    PagesModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
