import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SignUpObj } from '../interface/signUp.interface';
import { SignInObj } from '../interface/signIn.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUrl: string = environment.appUrl;

  constructor(private http: HttpClient) {}

  registerUser(payload: object) {
    return this.http.post<SignUpObj>(`${this.appUrl}/accounts/user/`, payload);
  }

  getToken(payload: object) {
    return this.http.post<SignInObj>(
      `${this.appUrl}/accounts/get_token/`,
      payload
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
