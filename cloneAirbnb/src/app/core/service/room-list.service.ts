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
      )
      .subscribe((res: any) => {
        console.log(res.results);
        for (let i = 0; i < res.results.length; i++) {
          this.getRoomDetailinfoService(res.results[i]);
          // this.makeMarker(res.results[i]);
        }
      });
  }

  getRoomDetailinfoService(res) {
    return this.http
      .get(`${this.appUrl}/rooms/${res.id}/`)
      .subscribe((res: any) => {
        const {
          image,
          id,
          title,
          capacity,
          bedroom,
          bathroom,
          room_type,
          space
        } = res;
        const roominfo = {
          id,
          image,
          title,
          room_type,
          capacity,
          space,
          bedroom,
          bathroom
        };
        this.roomList.push(roominfo);
      });
  }

  setPriceService(minValueTest, maxValueTest) {
    return this.http
      .get(
        `${this.appUrl}/rooms/?search=${
          this.reservationInfoService.reservationInfoObj.destination
        }&ordering=price&page_size=12&page=1&min_price=${minValueTest}&max_price=${maxValueTest}`
      )
      .subscribe((res: any) => {
        for (let j = 0; j < res.results.length; j++) {
          console.log(res.results);
          this.getRoomList();
        }
        // console.log(res);
      });
  }
}
