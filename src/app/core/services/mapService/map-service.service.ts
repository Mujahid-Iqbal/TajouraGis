import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
  map!: mapboxgl.Map;
  constructor() { }

  
}
