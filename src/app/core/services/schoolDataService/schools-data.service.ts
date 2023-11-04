import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolsData } from '../../models/user/schools';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolsDataService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }



  getAllSchools(): Observable<SchoolsData> {
    return this.http
      .get<SchoolsData>(
        `${environment.apiBaseUrl}/schools/`,this.httpOptions
      )
  }

  getSchoolByID(id: number): Observable<SchoolsData> {
    return this.http
      .get<SchoolsData>(
        `${environment.apiBaseUrl}/schools/${id}`,this.httpOptions
      )
  }

  updateSchool(id: number): Observable<SchoolsData> {
    return this.http
      .get<SchoolsData>(
        `${environment.apiBaseUrl}/schools/${id}`,this.httpOptions
      )
  }

  deleteSchools(): Observable<SchoolsData> {
    return this.http
      .get<SchoolsData>(
        `${environment.apiBaseUrl}/schools/`,this.httpOptions
      )
  }
}
