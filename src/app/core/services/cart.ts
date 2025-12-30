import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { AuthService } from './auth-service';
import { AddCart } from '../interface/IProducts';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  cartUpdated = new BehaviorSubject<void>(undefined);

  constructor(private _httpClient: HttpClient, private authServ: AuthService) {}

  getCartProducts(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/cart/allCart`, {
      headers: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
  }

  addToCart(data: AddCart): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/cart/addToCart`, data, {
      headers: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
  }
  removeFromCart(productId: string): Observable<any> {
    return this._httpClient.delete(`${BaseUrl}/cart/removeFromCart`, {
      body: { productId },
      headers: { Authorization: `Bearer ${this.authServ.getToken()}` },
    });
  }
}
