import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ReservationInfoService } from '../../core/service/reservation-info.service';

@Injectable({
  providedIn: 'root'
})
export class RoomListService {
  appUrl: string = environment.appUrl;
  roomList = [];

  constructor(
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService
  ) {}

  getRoomList() {
    return this.http
      .get<any>(
        `${this.appUrl}/rooms/?search=${
          this.reservationInfoService.reservationInfoObj.destination
        }&ordering=price&page_size=12&page=1`
      );
  }

  getRoomDetailinfoService(res) {
    return this.http
      .get(`${this.appUrl}/rooms/${res.id}/`);
  }

  setPriceService(minValueTest, maxValueTest) {
    return this.http
      .get(
        `${this.appUrl}/rooms/?search=${
          this.reservationInfoService.reservationInfoObj.destination
        }&ordering=price&page_size=12&page=1&min_price=${minValueTest}&max_price=${maxValueTest}`
      )
  }
}
