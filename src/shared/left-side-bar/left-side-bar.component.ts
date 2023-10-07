import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import * as mapboxgl from 'mapbox-gl';

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
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = [position.coords.longitude, position.coords.latitude];
        console.log(userLocation)
        this.mapService.userLocation = new mapboxgl.LngLat(position.coords.longitude, position.coords.latitude);
        console.log(this.mapService.userLocation)
        this.getNearByScools()
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

  getNearByScools() {
    this.mapService.schoolsData.forEach((school: any) => {
      const schoolLocation = new mapboxgl.LngLat(school.X, school.Y);
        const distance = this.calculateDistance(this.mapService.userLocation, schoolLocation);
        school['distance'] = distance;  // Add distance to each school
    });
     // Sort schools by distance
     this.schools = this.mapService.schoolsData.sort((a: any, b: any) => a['distance'] - b['distance']);
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
