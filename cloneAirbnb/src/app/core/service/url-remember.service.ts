import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlRememberService {
  currentUrl: string = '/home';
}
