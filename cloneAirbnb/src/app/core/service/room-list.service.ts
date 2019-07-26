import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ReservationInfoService } from '../../core/service/reservation-info.service';

import { RoomDetail } from '../interface/roomDetail.interface';
import { RoomList } from '../interface/roomList.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomListService {
  appUrl: string = environment.appUrl;
  roomList = [];
  roomListUpDated: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService
  ) {}

  getRoomList() {
    return this.http.get<RoomList>(
      `${this.appUrl}/rooms/?search=${
        this.reservationInfoService.reservationInfoObj.destination
      }&ordering=price&page_size=12&page=1`
    );
  }

  roomChangeDetect() {
    this.roomListUpDated.emit(this.roomList);
  }

  // getRoomDetailinfoService(res) {
  //   this.roomList = [];
  //   return this.http
  //     .get(`${this.appUrl}/rooms/${res.id}/`)
  //     .subscribe((res: any) => {
  //       const {
  //         image,
  //         id,
  //         title,
  //         capacity,
  //         bedroom,
  //         bathroom,
  //         room_type,
  //         space
  //       } = res;
  //       const roominfo = {
  //         id,
  //         image,
  //         title,
  //         room_type,
  //         capacity,
  //         space,
  //         bedroom,
  //         bathroom
  //       };
  //       this.roomList.push(roominfo);
  //       console.log(this.roomList);
  //     });
  // }

  // setPriceService(minValueTest, maxValueTest) {
  //   return this.http
  //     .get(
  //       `${this.appUrl}/rooms/?search=${
  //         this.reservationInfoService.reservationInfoObj.destination
  //       }&ordering=price&page_size=12&page=1&min_price=${minValueTest}&max_price=${maxValueTest}`
  //     )
  //     .subscribe((res: any) => {
  //       for (let j = 0; j < res.results.length; j++) {
  //         console.log(res.results);
  //         this.getRoomDetailinfoService(res.results[j]);
  //       }
  //     });
  // }
}
