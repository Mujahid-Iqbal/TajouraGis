import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  map!: mapboxgl.Map;

  constructor(private myDialogService: CustomDialogService) { }

  ngOnInit() {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapboxAccessToken,
      container: 'map', // Replace 'map' with the ID of your map container element in the template
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [32.827943 , 13.381835], // Set the initial map center coordinates
      zoom: 4 // Set the initial zoom level
    });
  }


  openDialog(): void {
    const dialogRef = this.myDialogService.openDialog();

    // You can close the dialog from here if needed
    // dialogRef.close();
  }
}
