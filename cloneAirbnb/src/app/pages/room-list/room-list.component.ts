import { Component, OnInit, NgZone } from '@angular/core';
import {
  ZoomControlOptions,
  ControlPosition,
  ZoomControlStyle
} from '@agm/core/services/google-maps-types';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { environment } from 'src/environments/environment';
import { Options } from 'ng5-slider';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

import { GoogleMapService } from './google-map.service';
import { ReservationInfoService } from '../../core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { MakerInfo } from '../../core/interface/maker-info.interface';
import { RoomList, Result } from '../../core/interface/roomList.interface';
import { Router } from '@angular/router';

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
  map: any;
  markers = this.roomListService.markers;
  latitude: number;
  longitude: number;
  selectedMarker;
  infowindowManager: InfoWindowManager;
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;
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
  dateStyle = {
    width: '65px'
  };

  // price range 데이터
  minValue = 0;
  maxValue = 1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    translate: (value: number): string => {
      return '￦' + value;
    }
  };
  priceToggle: boolean;

  // 방 목록
  roomimage: string;
  address: string;

  // 전체 방 개수
  roomCount: number;

  // 별점
  max = 5;
  rate: number;
  isReadonly = true;

  constructor(
    private mapsService: GoogleMapService,
    private ngzone: NgZone,
    private reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService,
    private router: Router
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
      this.roomCount = this.roomList.length;
    });

    this.roomListService.markersUpDated.subscribe((marker: MakerInfo[]) => {
<<<<<<< HEAD
      // console.log(this.markers);
      this.markers = marker;
      // console.log(marker);
      // console.log(this.markers);
      
=======
      this.markers = marker;
>>>>>>> rmorigin/develop
    });

<<<<<<< HEAD
      // console.log(1);
=======
    this.roomListService.centerUpDated.subscribe(latlng => {
>>>>>>> rmorigin/develop
      this.latitude = latlng[0];
      this.longitude = latlng[1];
      this.map.setCenter({ lat: this.latitude, lng: this.longitude });
    });
  }

  getRoomInfo() {
    this.roomListService.getRoomList().subscribe((res: RoomList) => {
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
        this.makeMarker(room);
      }
      this.roomCount = this.roomList.length;
    });
  }

  mapReady(map) {
    this.map = map;
  }

  makeMarker(room) {
    this.roomListService.getMarkerLatLan(room);
  }

  setRoomList() {
    this.roomListService.roomList = [];
    return this.roomListService.getRoomList().subscribe(res => {
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
      }
      this.roomListService.roomChangeDetect();
    });
  }

  onValueChange(value: Date): void {
    this.reservationInfoService.reservationInfoObj.checkIn = `${value[0].getMonth() +
      1}/${value[0].getDate()}/${value[0].getFullYear()}`;

    this.reservationInfoService.reservationInfoObj.checkOut = `${value[1].getMonth() +
      1}/${value[1].getDate()}/${value[1].getFullYear()}`;

    this.setRoomList();
  }

  widthChange() {
    this.dateStyle = {width: '150px'};
  }

  changePersonnel() {
    this.setRoomList();
  }

  setPrice() {
    const minValue = this.minValue;
    const maxValue = this.maxValue;
    this.roomListService.minPrice = minValue;
    this.roomListService.maxPrice = maxValue;

    this.setRoomList();
  }

  sendResvationId(id) {
    this.reservationInfoService.id = id;
    this.roomListService.roomList = [];
    this.roomListService.markers = [];
    this.router.navigate([`roomdetail/${id}`]);
  }

  mapClick() {
    if (this.previousIW != null) {
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
    if (
      personnelType.id === 'adults' &&
      this.reservationInfoService.reservationInfoObj[personnelType.id] === 1
    ) {
    } else {
      if (
        this.reservationInfoService.reservationInfoObj[personnelType.id] > 0
      ) {
        this.reservationInfoService.reservationInfoObj[personnelType.id]--;

        this.reservationInfoService.reservationInfoObj.personnel--;
      }
    }
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
