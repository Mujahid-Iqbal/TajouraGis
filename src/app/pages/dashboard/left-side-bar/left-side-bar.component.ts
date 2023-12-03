import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import * as mapboxgl from 'mapbox-gl';
import * as geolib from 'geolib';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/core/models/user/user';

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
  schools: any;
  currentUSer: User
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
  constructor(private customService: CustomDialogService, private mapService: MapServiceService, private el: ElementRef, private authService: AuthService) {
    this.currentUSer = this.authService.localUser();
   }

  ngOnInit() {
    setTimeout(() => {
      const userLocationMarker = new mapboxgl.Marker({
        color: 'red' // Customize the marker color
      });
      this.currentUSer = this.authService.localUser();

      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation1: any = [position.coords.longitude, position.coords.latitude];
        console.log('userLocation1', userLocation1)
        const userLocation: any = [13.358669 ,32.816529];
        console.log('location' ,userLocation)
        const targetLocation = { latitude: 13.358669, longitude:  32.816529};
        
        // console.log(userLocation)  
      // Set the marker's location to the user's location
        userLocationMarker.setLngLat(userLocation);
    
      // Add the marker to the map
        userLocationMarker.addTo(this.mapService.map);
        
        const nearbySchools = this.findNearbyPoints( this.mapService.schoolsData, targetLocation, 6);
        console.log('ear',nearbySchools)
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

  findNearbyPoints(data: any[], targetLocation: { latitude: number, longitude: number }, radius: number) {
    const nearbyPoints: { data: any, distance: number }[] = [];

    for (const point of data) {
    //   console.log('pointY', point.Y , 'PointX', point.X)
    //   console.log(
    //     'You are ',
    //     geolib.getDistance(targetLocation, {
    //         latitude: 13.44093,
    //         longitude: 32.7941083,
    //     }),
    //     'meters away from 51.525, 7.4575'
    // );
      const distance = geolib.getDistance(targetLocation, { latitude: point.x, longitude:  point.y});
      console.log(distance)
      if (distance <= radius * 1000) { // Convert the radius to meters
        // Include the distance directly in the point object
        // const distance1 = geolib.convertDistance(distance, 'km');
        point.distance = distance;
        nearbyPoints.push(point);
      }
    }

    return nearbyPoints;
  }


  calculateDistance(point1: { latitude: number, longitude: number }, point2: { latitude: number, longitude: number }) {
    const earthRadiusKm = 6371; // Earth radius in kilometers
    const lat1Rad = this.degreesToRadians(point1.latitude);
    const lat2Rad = this.degreesToRadians(point2.latitude);
    const deltaLat = this.degreesToRadians(point2.latitude - point1.latitude);
    const deltaLon = this.degreesToRadians(point2.longitude - point1.longitude);

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;
    return distance;
  }

  degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
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
