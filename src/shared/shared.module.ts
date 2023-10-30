import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for animations
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // Add BrowserAnimationsModule
    FormsModule
  ],
  exports: [],
})
export class SharedModule { }
