import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private _httpClient: HttpClient) {}
  allProducts(): Observable<any> {
    return this._httpClient.get(`${BaseUrl}/products`);
  }
}
