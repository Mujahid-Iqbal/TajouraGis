import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EducationalLevel, SchoolsData } from '../../models/user/schools';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class SchoolsDataService extends ApiService {
  getAllSchool: Subject<any> = new Subject<any>();
  totalAllSchools: any
  constructor(private http: HttpClient) {
    super();
  }


  public allSchool(value: any): void {
    this.getAllSchool.next(value);
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

  createSchool(data: SchoolsData): Observable<SchoolsData> {
    return this.http.post<SchoolsData>(`${environment.apiBaseUrl}/schools/`, data, this.httpOptions);
  }

  createAcademicLevel(data: EducationalLevel): Observable<SchoolsData> {
    return this.http.post<SchoolsData>(`${environment.apiBaseUrl}/levels/`, data, this.httpOptions);
  }

  deleteSchools(id: number): Observable<SchoolsData> {
    return this.http
      .delete<SchoolsData>(
        `${environment.apiBaseUrl}/schools/${id}`,this.httpOptions
      )
  }
  //get all users
  getAllUsers(): Observable<User> {
    return this.http
      .get<User>(
        `${environment.apiBaseUrl}/users/`,this.httpOptions
      )
  }
}
