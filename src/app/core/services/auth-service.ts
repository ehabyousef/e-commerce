import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { BaseUrl } from '../apiRoot/baseUrl';
import { ILogin, IRegister } from '../interface/iregister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  register(userData: IRegister): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/users`, userData);
  }
  login(userData: ILogin): Observable<any> {
    return this._httpClient.post(`${BaseUrl}/auth/login`, userData);
  }
}
