import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as mapboxgl from 'mapbox-gl';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  map!: mapboxgl.Map;
  schoolsData: any;
  sidenavIsOpen?: boolean
   infoPanelSchoolData: Subject<any> = new Subject<any>();
  public rightSideNav!: MatSidenav;

  constructor() { }

  public setRightSidenav(sidenav: MatSidenav) { 
    this.rightSideNav = sidenav;
  }

  public infoPanelData(value: any): void {
    this.infoPanelSchoolData.next(value);
  }

  public openRightSideNav() {
    return this.rightSideNav.open();
  }

  public closeRightSideNav() {
    return this.rightSideNav.close();
  }
  openSideNav() {
    this.rightSideNav.open().then((sidenavIsOpen: any) => {
      this.sidenavIsOpen = sidenavIsOpen 
      console.log(this.sidenavIsOpen)
    })
  }
  
  closeSideNav() {
    this.rightSideNav.close().then((sidenavIsOpen: any) => {
      this.sidenavIsOpen = sidenavIsOpen 
    })
  }
}
