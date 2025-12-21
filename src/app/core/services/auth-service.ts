import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { ILogin, IRegister } from '../interface/iregister';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _platformId = inject(PLATFORM_ID);

  register(userData: IRegister): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/auth/register`, userData);
  }

  login(userData: ILogin): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/auth/login`, userData);
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout(): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    }
  }

  get isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
