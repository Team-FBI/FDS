import { Injectable, EventEmitter, NgZone } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { ReservationInfoService } from '../../core/service/reservation-info.service';

import { RoomList } from '../interface/roomList.interface';
import { GoogleMapService } from 'src/app/pages/room-list/google-map.service';
import { MakerInfo } from '../interface/maker-info.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomListService {
  appUrl: string = environment.appUrl;
  roomList = [];
  markers = [];
  Glat: number;
  Glng: number;
  centerLat: number;
  centerLng: number;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  minPrice = 0;
  maxPrice = 1000000;
  checkInDate = this.reservationInfoService.reservationInfoObj.checkIn;
  checkOutDate = this.reservationInfoService.reservationInfoObj.checkOut;
  roomListUpDated: EventEmitter<any> = new EventEmitter();
  markersUpDated: EventEmitter<any> = new EventEmitter();
  centerUpDated: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService,
    private mapService: GoogleMapService,
    private ngzone: NgZone
  ) {
    this.minPrice = 0;
    this.maxPrice = 1000000;
  }

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

  getState(state: string) {
    return this.http.get(`${this.appUrl}/locations/state/?search=${state}`);
  }

  getMarkerLatLan(room) {
    const {
      image,
      image_1,
      image_2,
      image_3,
      image_4,
      room_type,
      beds,
      total_rating,
      id,
      title
    } = room;
    this.mapService.getLatLan(room.address).subscribe(result => {
      this.ngzone.run(() => {
        this.Glat = result.lat();
        this.Glng = result.lng();
        const makerInfo: MakerInfo = {
          id,
          lat: this.Glat,
          lng: this.Glng,
          alpha: 1,
          title,
          image,
          image_1,
          image_2,
          image_3,
          image_4,
          room_type,
          beds,
          total_rating,
          disabled: false
        };
        this.markers.push(makerInfo);
      });
      this.centerLat = this.Glat;
      this.centerLng = this.Glng;
      this.centerUpDated.emit([this.centerLat, this.centerLng]);
    });
  }

  roomChangeDetect() {
    this.roomListUpDated.emit(this.roomList);
    this.markersUpDated.emit(this.markers);
    this.roomList = [];
  }
}
