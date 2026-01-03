import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { ICategory } from '../interface/IProducts';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    return this._HttpClient.get<ICategory[]>(`${BaseUrl}/categories`);
  }
}
