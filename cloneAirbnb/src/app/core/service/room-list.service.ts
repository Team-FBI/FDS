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
  minPrice: number;
  maxPrice: number;
  startDate: string;
  endDate: string;
  roomListUpDated: EventEmitter<any> = new EventEmitter();
  markersUpDated: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService,
    private mapService: GoogleMapService,
    private ngzone: NgZone
  ) {
    
    this.minPrice = 0;
    this.maxPrice = 1000000;

  }

  getRoomList() {
    if (!this.reservationInfoService.reservationInfoObj.destination) {
      this.reservationInfoService.reservationInfoObj.destination = 'seoul';
    }

    return this.http
      .get<any>(
        `${this.appUrl}/rooms/?search=${
          this.reservationInfoService.reservationInfoObj.destination
        }&ordering=price&page_size=12&page=1&min_price=${this.minPrice}&max_price=${this.maxPrice}`
      );
  }

  getMarkerLatLan(room) {
    const { image, id, title } = room;
    this.mapService.getLatLan(room.address).subscribe(result => {
      this.ngzone.run(() => {
        this.Glat = result.lat();
        this.Glng = result.lng();
        const makerInfo: MakerInfo = {
          id,
          lat: this.Glat,
          lng: this.Glng,
          alpha: 1,
          content: title,
          url: image,
          disabled: false
        };
        this.markers.push(makerInfo);
      });
    });
  }

  setPriceService(minValueTest, maxValueTest) {
    return this.http.get<RoomList>(
      `${this.appUrl}/rooms/?search=${
        this.reservationInfoService.reservationInfoObj.destination
      }&ordering=price&page_size=12&page=1&min_price=${minValueTest}&max_price=${maxValueTest}`
    );
  }

  roomChangeDetect() {
    this.roomListUpDated.emit(this.roomList);
    this.markersUpDated.emit(this.markers);
    this.roomList = [];
  }
}
