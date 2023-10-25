import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../..//..//environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl!: string;

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    httpOptionsFormData = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
        }),
    };
  constructor() {
    this.apiUrl = `${environment.apiBaseUrl}/api`;
  }
}
