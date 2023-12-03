import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
//Components
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { SchoolsDataService } from 'src/app/core/services/schoolDataService/schools-data.service';
import { User } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private userLocation!: mapboxgl.LngLat;
  currentUser?: User
  searchQuery: string = '';
  private searchQuerySubject = new Subject<string>();

  constructor(
    private myDialogService: CustomDialogService, 
    private mapService: MapServiceService, 
    private http: HttpClient,
    private authService: AuthService,
    private schoolDataService: SchoolsDataService) { 
      this.currentUser = this.authService.localUser();
    }

  ngOnInit() {
    this.schoolDataService.getAllSchools().pipe(
      tap((res: any) => {
        console.log('okoko',res)
      })
    ).subscribe();
    
    const jsonFile = 'assets/jsonFile/finalData.json';
    this.http.get(jsonFile).subscribe((data) => {
      this.mapService.schoolsData = data;
      console.log(this.mapService.schoolsData); // You can now access and work with the JSON data
      this.initializeMap();

    });

  }

  // Function to handle search and fly to a school
  onSearchChange(searchTerm: string) {
    this.searchQuerySubject.next(searchTerm);
  }

  ngAfterViewInit() {
    this.searchQuerySubject
      .pipe(debounceTime(300)) // Adjust debounce time as needed (milliseconds)
      .subscribe(searchTerm => {
        if (searchTerm) {
          const lowercaseSearchTerm = searchTerm.toLowerCase();
          const school = this.mapService.schoolsData.find((s: any) =>
            s['school_name'].toLowerCase().includes(lowercaseSearchTerm)
          );
          if (school) {
            const schoolLocation = new mapboxgl.LngLat(school.x, school.y);
            this.mapService.map.flyTo({
              center: [schoolLocation.lng, schoolLocation.lat],
              zoom: 18,
              speed: 1.2
            });
          }
        }

      });

  }

  private initializeMap() {
    this.mapService.map = new mapboxgl.Map({
      accessToken: environment.mapboxAccessToken,
      container: 'map', // Replace 'map' with the ID of your map container element in the template
      style: this.myDialogService.selectedStyle ? this.myDialogService.selectedStyle : 'mapbox://styles/mujahid-iqbal/clnfw2m1u007b01pi2h2ufz4w',
      center: [32.7782362, 13.3947453], // Set the initial map center coordinates
      zoom: 6, // Set the initial zoom level
     
    });

    // Lazy load the RTL text plugin
    mapboxgl.setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      () => { }, // Empty function for handling potential errors
      true
    );

    // For demonstration purposes, let's assume a fixed user location
   
    this.mapService.schoolsData.forEach((school: any) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([school.x, school.y])
        .addTo(this.mapService.map);
      this.mapService.map.flyTo({
        center: [school.x, school.y],
        zoom: 10, // You can adjust the zoom level as needed
        speed: 1.2, // Adjust the fly animation speed

      });
      const popup = new mapboxgl.Popup({
        className: 'custom-popup',
        closeButton: false,
        closeOnClick: false
      })
        .setLngLat([school.x, school.y])  // Position the popup at the marker's coordinates
        .setHTML(`<p>${school['school_name']}</p>`)
        .addTo(this.mapService.map);;



      marker.getElement().addEventListener('click', () => {

        this.mapService.infoPanelData(school);

      });
    });
   
  }

  logout() {
    this.authService.logout()
  }

}
