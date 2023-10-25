import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../../models/user/authenticateduser';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  isLogin: boolean = false
  public currentUser!: Observable<AuthenticatedUser>;
  private currentUserSubject!: BehaviorSubject<AuthenticatedUser>;


  constructor(private http: HttpClient) {
    super();
    this.currentUserSubject = new BehaviorSubject<AuthenticatedUser>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): AuthenticatedUser {
    return this.currentUserSubject.value;
  }

  public localUserObject() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}') as AuthenticatedUser;
  }

  public updateUser(user: any) {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  isLoggedIn() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }
    return false;
  }

  GetAuthToken(username: string, password: string): Observable<AuthenticatedUser> {
    return this.http
      .post<AuthenticatedUser>(
        `${environment.apiBaseUrl}/account/login/`,
        {
          username,
          password,
        },
        this.httpOptions
      )
      .pipe(
        map((user: any) => {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        shareReplay()
      );
  }
  GetUser(): Observable<object> {
    return this.http
      .get<object>(
        `${environment.apiBaseUrl}/account/user/`,
        {
        }
      )
      .pipe();
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null!);
    window.location.href = '/login';
  }
}
