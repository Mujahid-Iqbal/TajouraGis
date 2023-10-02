import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InfoPanelComponent } from '../../../pages/info-panel/info-panel.component';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(): MatDialogRef<InfoPanelComponent> {
    return this.dialog.open(InfoPanelComponent, {
      width: '50%',
      position: {
        right: '0',
        top: '3.9%'
      }
    });
  }
}
