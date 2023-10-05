import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CustomDialogService } from 'src/app/core/services/dialog-service/custom-dialog.service';
import { MapServiceService } from 'src/app/core/services/mapService/map-service.service';

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
  constructor(private customService: CustomDialogService, private mapService: MapServiceService, private el: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.schools = this.mapService.schoolsData
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
