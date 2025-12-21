import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('userName') || 'guest'
  );
  constructor(private _httpClient: HttpClient, private authServ: AuthService) {}
  getCartCount(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/cart/allCart`, {
      headers: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
  }
}
