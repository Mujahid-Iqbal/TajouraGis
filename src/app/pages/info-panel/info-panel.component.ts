import { Component } from '@angular/core';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent {
  selectedSchool: any
  data: any
  constructor(private mapService: MapServiceService) {
    // You can access the passed data here using this.data
    this.mapService.infoPanelSchoolData.subscribe((data: any) => {
      this.selectedSchool = data;
      this.data = data;
      this.mapService.openRightSideNav()

    })
    
  }

  close() {
    this.mapService.closeRightSideNav()
  }

  
}
