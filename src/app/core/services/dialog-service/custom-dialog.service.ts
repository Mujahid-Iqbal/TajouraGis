import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoPanelComponent } from '../../../pages/info-panel/info-panel.component';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {
  selectedStyle?: string;
  constructor(private dialog: MatDialog) { }

  openDialog(schoolData: any): MatDialogRef<InfoPanelComponent> {
    return this.dialog.open(InfoPanelComponent, {
      width: '50%',
      position: {
        right: '0',
        top: '3.9%'
      },
      panelClass: ['animate__animated','animate__slideInRight', 'custom-dialog'],
      data: schoolData
    });
  }


  getMapStyleImage(style: string): string {
    // Map style names to their corresponding images
    const styleImages: any = {
      'mapbox://styles/mujahid-iqbal/clnfw2m1u007b01pi2h2ufz4w': 'path/to/streets-image.png',
      'mapbox://styles/mujahid-iqbal/clnfwrkjq03ud01nz97prc7z6': 'path/to/satellite-image.png',
      'mapbox://styles/mujahid-iqbal/clnfwpic1021v01qncbsnc8o4': 'path/to/outdoors-image.png',
      // Add more style-to-image mappings as needed
    };
  
    // Return the image URL for the given style
    return styleImages[style];
  }
}
