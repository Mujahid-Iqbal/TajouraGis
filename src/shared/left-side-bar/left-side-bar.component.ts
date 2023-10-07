import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {
  @ViewChild('rightsidenav', { static: true }) public rightsidenav!: MatSidenav;
  sidenavWidth = 4;
  selectedCard: number | null = null;
  temporaryDisabled: any = false;
  checkBoxChecked: boolean = true; // Default checked state
  schools: any
  mapStyle: string = 'mapbox://styles/mujahid-iqbal/clnfw2m1u007b01pi2h2ufz4w';

  getMapStyleImage(style: string): string {
    // Define mappings from style names to image URLs here
    const styleImageMappings: Record<string, string> = {
      'mapbox://styles/mujahid-iqbal/clnfw2m1u007b01pi2h2ufz4w': 'assets/img/street.jpeg',
      'mapbox://styles/mapbox/satellite-v9?language=ar': 'assets/img/satellite.png',
      'mapbox://styles/mujahid-iqbal/clnfwpic1021v01qncbsnc8o4': 'assets/img/outdoors.png'
    };

    return styleImageMappings[style];
  }

  styleToMapName: any = {
    'mapbox://styles/mujahid-iqbal/clnfw2m1u007b01pi2h2ufz4w': 'الطرق',
    'mapbox://styles/mapbox/satellite-v9?language=ar': 'الأقمار الصناعية',
    'mapbox://styles/mujahid-iqbal/clnfwpic1021v01qncbsnc8o4': 'الخارج'
  };
  styles = Object.keys(this.styleToMapName);
  constructor(private customService: CustomDialogService, private mapService: MapServiceService, private el: ElementRef) { }

  ngOnInit() {
    
    setTimeout(() => {
      const userLocationMarker = new mapboxgl.Marker({
        color: 'red' // Customize the marker color
      });
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: any = [position.coords.longitude, position.coords.latitude];
        // const userLocation: any = [13.3497940, 32.8085120];
        console.log(userLocation)  
      // Set the marker's location to the user's location
      //   userLocationMarker.setLngLat(userLocation);
    
      // // Add the marker to the map
      //   userLocationMarker.addTo(this.mapService.map);
        
        const nearbySchools = this.findNearbyPoints( this.mapService.schoolsData, userLocation, 7);
        this.schools = nearbySchools.sort((a: any, b: any) => a['distance'] - b['distance']);
      }, (error) => {
        // Handle geolocation error here
        console.error('Error getting user location:', error);
      });
      
    }, 1000);
    this.mapService.setRightSidenav(this.rightsidenav);
  }


  changeMapStyle(style: string): void {
    if (style !== this.customService.selectedStyle) {
      this.mapService.map.setStyle(style);
      this.mapStyle = style
      this.customService.selectedStyle = style;
    }
  }

  findNearbyPoints(data: any[], targetLocation: number[], radius: number) {
    const options: any = { units: 'kilometers' };
    const targetPoint = turf.point(targetLocation);
    const nearbyPoints: { data: any, distance: number }[] = [];

    for (const point of data) {
      const distance = turf.distance(targetPoint, turf.point([point.X, point.Y]), options);

      if (distance <= radius) {
        // Include the distance directly in the point object
        point.distance = distance;
        nearbyPoints.push(point);
      }
    }

    return nearbyPoints;
  }  

  selectCard(cardNumber: number) {
    if (this.selectedCard === cardNumber) {
      this.selectedCard = null;
    } else {
      // Otherwise, open the selected card
      this.selectedCard = cardNumber;
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    // Check if the click event occurred outside of the card
    if (!this.el.nativeElement.contains(event.target)) {
      this.selectedCard = null; // Close the card
    }
  }
}
