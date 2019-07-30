import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ReservationInfoService } from '../../core/service/reservation-info.service';

import { RoomList } from '../interface/roomList.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomListService {
  appUrl: string = environment.appUrl;
  roomList = [];
  minPrice = 0;
  maxPrice = 1000000;
  checkInDate = this.reservationInfoService.reservationInfoObj.checkIn;
  checkOutDate = this.reservationInfoService.reservationInfoObj.checkOut;
  roomListUpDated: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService
  ) {}

  dateRefactoring(day: string) {
    const splitDate = day.split('/');
    const newDate = [];
    for (const date of splitDate) {
      if (date.length === 4) {
        newDate.unshift(date);
      } else {
        newDate.push(date);
      }
    }
    return newDate.join('-');
  }

  getRoomList() {
    const minPrice = this.minPrice;
    const maxPrice = this.maxPrice;
    const checkInDate = this.dateRefactoring(this.checkInDate);
    const checkOutDate = this.dateRefactoring(this.checkOutDate);
    const capacity = this.reservationInfoService.reservationInfoObj.personnel;

    if (!this.reservationInfoService.reservationInfoObj.destination) {
      this.reservationInfoService.reservationInfoObj.destination = 'seoul';
    }

    return this.http.get<RoomList>(
      `${this.appUrl}/rooms/?search=${
        this.reservationInfoService.reservationInfoObj.destination
      }&ordering=price&page_size=12&page=1&min_price=${minPrice}&max_price=${maxPrice}&start_date=${checkInDate}&end_date=${checkOutDate}&capacity=${capacity}`
    );
  }

  roomChangeDetect() {
    this.roomListUpDated.emit(this.roomList);
    this.roomList = [];
  }
}
