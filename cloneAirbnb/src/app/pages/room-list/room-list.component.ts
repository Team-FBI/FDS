import { Component, OnInit, NgZone } from '@angular/core';
import {
  ZoomControlOptions,
  ControlPosition,
  ZoomControlStyle
} from '@agm/core/services/google-maps-types';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { environment } from 'src/environments/environment';
import { Options } from 'ng5-slider';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { GoogleMapService } from './google-map.service';
import { ReservationInfoService } from '../../core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { ThrowStmt } from '@angular/compiler';
import { RoomList, Result } from '../../core/interface/roomList.interface';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  //백엔드 연결 URL
  appUrl: string = environment.appUrl;
  roomList = this.roomListService.roomList;

  // 지도관련 변수
  latitude = 33.36995865711402;
  longitude = 126.52811723292518;
  selectedMarker;
  infowindowManager: InfoWindowManager;
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;
  markers = [];
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.LEFT_TOP,
    style: ZoomControlStyle.LARGE
  };
  previous: any;
  icon = {
    url: 'https://i.dlpng.com/static/png/510666_thumb.png',
    scaledSize: { width: 50, height: 60 }
  };
  Glat: number;
  Glng: number;

  // datepicker 데이터
  myDateValue: Date;
  Allcounter = 0;
  Adultcounter = 0;
  Childcounter = 0;
  Youngcounter = 0;
  dateCustomClasses: DatepickerDateCustomClasses[];
  datestyle = {
    width: '52px'
  };

  // price range 데이터
  minValue: number = 0;
  maxValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number): string => {
      return '￦' + value;
    }
  };
  priceToggle: boolean;

  // 방 목록
  roomimage: string;
  address: string;

  constructor(
    private mapsService: GoogleMapService,
    private ngzone: NgZone,
    private reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService
  ) {
    this.currentIW = null;
    this.previousIW = null;

    const now = new Date();
    const twoDaysAhead = new Date();
    twoDaysAhead.setDate(now.getDate() + 2);
    const fourDaysAhead = new Date();
    fourDaysAhead.setDate(now.getDate() + 4);

    this.dateCustomClasses = [
      { date: now, classes: [] },
      { date: twoDaysAhead, classes: ['bg-warning'] },
      { date: fourDaysAhead, classes: ['bg-danger', 'text-warning'] }
    ];
  }

  ngOnInit() {
    this.getRoomInfo();

    this.roomListService.roomListUpDated.subscribe((roomList: Result[]) => {
      this.roomList = roomList;
    });
  }

  getRoomInfo() {
    this.roomListService.getRoomList().subscribe((res: RoomList) => {
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
      }
    });
  }

  // setPrice() {
  //   const minValueTest = this.minValue;
  //   const maxValueTest = this.maxValue;
  //   this.roomListService.setPriceService(minValueTest, maxValueTest);
  //   console.log(this.roomListService.roomList);
  //   this.roomList = this.roomListService.roomList;
  //   console.log(this.roomList);
  // }

  // makeMarker(res) {
  //   const { image, id, title } = res;
  //   console.log(res.address);
  //   this.mapsService.getLatLan(res.address).subscribe(result => {
  //     this.ngzone.run(() => {
  //       this.Glat = result.lat();
  //       this.Glng = result.lng();
  //       const makerInfo = {
  //         id,
  //         lat: this.Glat,
  //         lng: this.Glng,
  //         alpha: 1,
  //         content: title,
  //         url: image,
  //         disabled: false
  //       };
  //       this.markers.push(makerInfo);
  //     });
  //   });
  // }

  chageStyle() {
    this.datestyle.width = 'auto';
  }

  savePirce() {
    console.log(this.minValue, this.maxValue);
  }

  max(coordType: 'lat' | 'lng'): number {
    return Math.max(...this.markers.map(marker => marker[coordType]));
  }

  min(coordType: 'lat' | 'lng'): number {
    return Math.min(...this.markers.map(marker => marker[coordType]));
  }

  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude
    };
  }

  mapClick() {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }

  increase(personnelType: HTMLSpanElement) {
    this.reservationInfoService.reservationInfoObj[personnelType.id]++;

    this.reservationInfoService.reservationInfoObj.personnel++;
  }

  decrease(personnelType: HTMLSpanElement) {
    if (this.reservationInfoService.reservationInfoObj[personnelType.id] > 0) {
      this.reservationInfoService.reservationInfoObj[personnelType.id]--;

      this.reservationInfoService.reservationInfoObj.personnel--;
    }
  }

  toggleRemoveText(binput) {
    console.log(binput);
  }

  get adults() {
    return this.reservationInfoService.reservationInfoObj.adults;
  }

  get children() {
    return this.reservationInfoService.reservationInfoObj.children;
  }

  get infants() {
    return this.reservationInfoService.reservationInfoObj.infants;
  }

  get personnel() {
    return this.reservationInfoService.reservationInfoObj.personnel;
  }
}
