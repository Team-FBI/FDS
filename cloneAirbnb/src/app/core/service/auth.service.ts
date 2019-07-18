import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUrl: string = environment.appUrl;

  constructor(private http: HttpClient) {}

  registerUser(payload: object) {
    return this.http.post(`${this.appUrl}/accounts/user/`, payload);
  }

  signInUser(payload: object) {
    return this.http.post(`${this.appUrl}/accounts/get_token/`, payload);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
  }
}
