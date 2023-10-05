import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
//Components
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InfoPanelComponent } from '../info-panel/info-panel.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private userLocation!: mapboxgl.LngLat;
  constructor(private myDialogService: CustomDialogService, private mapService: MapServiceService, private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit() {
    const jsonFile = 'assets/jsonFile/schoolData.json';
    this.http.get(jsonFile).subscribe((data) => {
      this.mapService.schoolsData = data;
      console.log(this.mapService.schoolsData); // You can now access and work with the JSON data
      this.initializeMap();
    });
    
  }

  private initializeMap() {
    this.mapService.map = new mapboxgl.Map({
      accessToken: environment.mapboxAccessToken,
      container: 'map', // Replace 'map' with the ID of your map container element in the template
      style: this.myDialogService.selectedStyle ? this.myDialogService.selectedStyle : 'mapbox://styles/mapbox/outdoors-v11',
      center: [32.7782362 , 13.3947453], // Set the initial map center coordinates
      zoom: 6 // Set the initial zoom level
    });
    // For demonstration purposes, let's assume a fixed user location
    this.userLocation = new mapboxgl.LngLat(13.400994, 32.780778);
    this.mapService.schoolsData.forEach((school: any) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([school.X, school.Y])
        .addTo(this.mapService.map);
        this.mapService.map.flyTo({
          center: [school.X, school.Y],
          zoom: 10, // You can adjust the zoom level as needed
          speed: 1.2, // Adjust the fly animation speed
        });
        // const popup = new mapboxgl.Popup({ className: 'custom-popup' }).setHTML(`<p>${school['School Name']}</p>`);

        // marker.setPopup(popup);
        // marker.togglePopup();
      
      const schoolLocation = new mapboxgl.LngLat(school.X, school.Y);
      const distance = this.calculateDistance(this.userLocation, schoolLocation);
      school['distance'] = distance;  // Add distance to each school

      marker.getElement().addEventListener('click', () => {
        marker.getElement().style.color = 'red';
        this.mapService.infoPanelData(school);
        
      });
    });
    // Sort schools by distance
    this.mapService.schoolsData.sort((a:any, b: any) => a['distance'] - b['distance']);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];
        
      }, (error) => {
        console.error('Error getting user location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  calculateDistance(point1: mapboxgl.LngLat, point2: mapboxgl.LngLat): number {
    const R = 6371e3;  // Radius of the Earth in meters
    const φ1 = this.toRadians(point1.lat);
    const φ2 = this.toRadians(point2.lat);
    const Δφ = this.toRadians(point2.lat - point1.lat);
    const Δλ = this.toRadians(point2.lng - point1.lng);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  toRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }


 }
