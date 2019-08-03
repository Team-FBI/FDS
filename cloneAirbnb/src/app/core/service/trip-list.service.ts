import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripListService {
  appUrl: string = environment.appUrl;
  tripList = [];

  constructor(
    private http: HttpClient
  ) { }

  getTripList() {
    return this.http.get(`
    ${this.appUrl}/trip/trips`);
  }
}
