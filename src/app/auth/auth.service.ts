import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './user';
import { JwtResponse } from './jwt-response';
import { ApiConfig } from '../shared/api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER: string = "http://localhost:";
  authSubject = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.AUTH_SERVER}${8093}/api/v1/user/save`, user).pipe(
      tap((res: JwtResponse) => {
        if (res.access_token) {
          localStorage.set("ACCESS_TOKEN", res.access_token);
          localStorage.set("EXPIRES_IN", res.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  singIn(user: User): Observable<JwtResponse> {

    const data = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)
      .set('grant_type', 'password');

    return this.http.post(`${this.AUTH_SERVER}${8092}/oauth/token`, data,
      { headers: this.getHeader() }).pipe(
        tap(async (res: JwtResponse) => {
          if (res.access_token) {
            localStorage.setItem("ACCESS_TOKEN", res.access_token);
            localStorage.setItem("EXPIRES_IN", res.expires_in);
            this.authSubject.next(true);
          }
        })
      );
  }

  signOut() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return this.authSubject.asObservable();
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dG9td2VsbEFwcDowNm9HZyNLRmFCcjE0VE43QGVaTEJ5U3N0JEt1VUR4bQ=='
    });
  }
}
