import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('guest');

  constructor(
    private _httpClient: HttpClient,
    private authServ: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.userName.next(localStorage.getItem('userName') || 'guest');
    }
  }
  getCartCount(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/cart/allCart`, {
      headers: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
  }

  allProducts(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/products`);
  }
}
