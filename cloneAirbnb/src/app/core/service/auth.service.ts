import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlRememberService } from './url-remember.service';
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
}
