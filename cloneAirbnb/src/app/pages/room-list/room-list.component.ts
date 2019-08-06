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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
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
  totalRooms: number;
  roomimage: string;
  address: string;

  // 전체 방 개수
  roomCount: number;

  // 별점
  max = 5;
  rate: number;
  isReadonly = true;

  rotate = true;
  maxSize = 5;
  currentPage = 1;
  page = this.roomListService.page;
  
  //날짜 차이 계산
  dayDiff: number;
  checkInDate: Date;
  checkOutDate: Date; 
  datePickerConfig: { containerClass: string; selectFromOtherMonth: boolean; };

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
    this.datePickerConfig = Object.assign(
      {},
      {
        rangeInputFormat: 'MM/DD',
        isAnimated: true,
        containerClass: 'theme-red',
        selectFromOtherMonth: true
      }
    );
  }

  

  ngOnInit() {
    this.getRoomInfo();
    this.checkInDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
    this.checkOutDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);
    this.dayDiff =
      (this.checkOutDate.getTime() - this.checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);

    this.roomListService.roomListUpDated.subscribe((roomList: Result[]) => {
      this.roomList = roomList;
      this.roomCount = this.roomList.length;
    });

    this.roomListService.markersUpDated.subscribe((marker: MakerInfo[]) => {
      this.markers = marker;
    });

    this.roomListService.centerUpDated.subscribe(latlng => {
      this.latitude = latlng[0];
      this.longitude = latlng[1];
      this.map.setCenter({ lat: this.latitude, lng: this.longitude });
    });
  }

  getRoomInfo() {
    this.isLoading$.next(true);
    this.roomListService.getRoomList().subscribe(
      (res: RoomList) => {
        this.totalRooms = res.count;
        for (const room of res.results) {
          this.roomListService.roomList.push(room);  
          this.makeMarker(room);
        }
        this.roomCount = this.roomList.length;
      },
      err => {},
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  mapReady(map) {
    this.map = map;
  }

  makeMarker(room) {
    this.roomListService.getMarkerLatLan(room);
  }

  setRoomList() {
    this.currentPage = 1;
    this.roomListService.roomList = [];
    this.roomListService.markers = [];
    return this.roomListService.getRoomList().subscribe(res => {
      this.totalRooms = res.count;
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
        this.makeMarker(room);
      }
      this.roomListService.roomChangeDetect();
    });
  }

  onValueChange(value: Date): void {
    this.reservationInfoService.reservationInfoObj.checkIn = `${value[0].getMonth() +
      1}/${value[0].getDate()}/${value[0].getFullYear()}`;

    this.reservationInfoService.reservationInfoObj.checkOut = `${value[1].getMonth() +
      1}/${value[1].getDate()}/${value[1].getFullYear()}`;

    this.roomListService.page = 1;
    this.checkInDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
    this.checkOutDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);
    this.dayDiff =
      (this.checkOutDate.getTime() - this.checkInDate.getTime()) /
      (1000 * 60 * 60 * 24);
    this.setRoomList();
  }

  widthChange() {
    this.dateStyle = { width: '150px' };
  }

  changePersonnel() {
    this.roomListService.page = 1;
    this.setRoomList();
  }

  setPrice() {
    const minValue = this.minValue;
    const maxValue = this.maxValue;
    this.roomListService.minPrice = minValue;
    this.roomListService.maxPrice = maxValue;

    this.roomListService.page = 1;
    this.setRoomList();
  }

  sendResvationId(id) {
    this.reservationInfoService.id = id;
    this.roomListService.roomList = [];
    this.roomListService.markers = [];
    this.router.navigate([`roomdetail/${id}`]);
  }

  // filterSpace(roomtypeDropdown, checkEntire, checkPrivate, checkHotel, checkShare) {
  //   roomtypeDropdown.isOpen = !roomtypeDropdown.isOpen;

  //   this.roomList = this.copyList;

  //   if (checkEntire.checked) {
  //     this.entireroomList = this.roomList.filter((room) => room.space === checkEntire.name);
  //   } else {
  //     this.entireroomList = [];
  //   }
  //   if (checkPrivate.checked) {
  //     this.privateroomList = this.roomList.filter((room) => room.space === checkPrivate.name);
  //   } else {
  //     this.privateroomList = [];
  //   }
  //   if (checkHotel.checked) {
  //     this.hotelroomList = this.roomList.filter((room) => room.space === checkHotel.name);
  //   } else {
  //     this.hotelroomList = [];
  //   }
  //   if (checkShare.checked) {
  //     this.sharedroomList = this.roomList.filter((room) => room.space === checkShare.name);
  //   } else {
  //     this.sharedroomList = [];
  //   }
  //   this.roomList = [...this.entireroomList, ...this.privateroomList, ...this.hotelroomList, ...this.sharedroomList];
  //   this.roomCount = this.roomList.length;
  // }

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

  initializeCurrentPage() {
    this.currentPage = 1;
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.roomListService.page = this.page;
    this.setRoomList();
  }

  // numberWithCommas(num) {
  //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }


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
