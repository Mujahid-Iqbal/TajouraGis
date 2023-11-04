import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SchoolsData } from 'src/app/core/models/user/schools';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';

@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent {
  selectedSchool: any
  data: SchoolsData
  constructor(private mapService: MapServiceService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public schoolData: any) {
    // You can access the passed data here using this.data
      this.selectedSchool = schoolData;
      this.data = schoolData    
  }
}
