import { Injectable } from '@angular/core';
import { ApiService } from '../apiService/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticatedUser } from '../../models/user/authenticateduser';
import { User } from '../../models/user/user';

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

  public localUser() {
    return  JSON.parse(localStorage.getItem('currentUserObj')   || '{}') as User;
  }

  public updateUser(user: any) {
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  isLoggedIn(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    }
    return false;
  }

  GetAuthToken(username: string, password: string): Observable<AuthenticatedUser> {
    return this.http
      .post<AuthenticatedUser>(
        `${environment.apiBaseUrl}/login/`,
        {
          username,
          password,
        },
        this.httpOptions
      )
      .pipe(
        map((user: any) => {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('authToken', JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        shareReplay()
      );
  }

  userRegister(first_name:string, last_name:string, email: string, username: string, password: string): Observable<AuthenticatedUser> {
    return this.http
      .post<AuthenticatedUser>(
        `${environment.apiBaseUrl}/signup/`,
        {
          first_name,
          last_name,
          email,
          username,
          password,
        },
        this.httpOptions
      )
  }


  GetUser(): Observable<object> {
    return this.http
      .get<object>(
        `${environment.apiBaseUrl}/me/`,this.httpOptions
      )
      .pipe(
        map((user: any) => {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUserObj', JSON.stringify(user));
          return user;
        }),
        shareReplay()
      );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null!);
    window.location.href = '/login';
  }
}
