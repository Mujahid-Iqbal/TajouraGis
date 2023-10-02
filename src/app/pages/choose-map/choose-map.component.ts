import { Component, OnInit } from '@angular/core';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';

@Component({
  selector: 'app-choose-map',
  templateUrl: './choose-map.component.html',
  styleUrls: ['./choose-map.component.scss']
})
export class ChooseMapComponent implements OnInit{
  mapStyle: string = 'mapbox://styles/mapbox/streets-v11';

  getMapStyleImage(style: string): string {
    // Define mappings from style names to image URLs here
    const styleImageMappings: Record<string, string> = {
      'mapbox://styles/mapbox/streets-v11': 'assets/img/street.jpeg',
      'mapbox://styles/mapbox/satellite-v9': 'assets/img/satellite.png',
      'mapbox://styles/mapbox/outdoors-v11': 'assets/img/outdoors.png'
    };

    return styleImageMappings[style];
  }

  styleToMapName: any = {
    'mapbox://styles/mapbox/streets-v11': 'Streets',
    'mapbox://styles/mapbox/satellite-v9': 'Satellite',
    'mapbox://styles/mapbox/outdoors-v11': 'Outdoors'
  };
  styles = Object.keys(this.styleToMapName);

  constructor(private customService: CustomDialogService, private mapService: MapServiceService) { }

  ngOnInit() {
  }
  
  changeMapStyle(style: string): void {
    if (style !== this.customService.selectedStyle) {
      this.mapService.map.setStyle(style);
      this.mapStyle = style
      this.customService.selectedStyle = style;
    }
  }
}
