import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolsDataService extends ApiService {

  constructor() {
    super()
   }
}
