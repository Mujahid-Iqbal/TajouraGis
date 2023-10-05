import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for animations
import { FormsModule } from '@angular/forms';

// Import Mat Module
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatCheckboxModule } from '@angular/material/checkbox';

// Import component
import { HeaderComponent } from './header/header.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { PagesModule } from 'src/app/pages/pages.module';



@NgModule({
  declarations: [
    HeaderComponent,
    LeftSideBarComponent
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    FormsModule,
    PagesModule,
    MatToolbarModule, // Add MatToolbarModule
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule
  ],
  exports: [HeaderComponent,LeftSideBarComponent],
})
export class SharedModule { }
