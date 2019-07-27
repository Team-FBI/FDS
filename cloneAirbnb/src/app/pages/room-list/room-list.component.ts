<<<<<<< HEAD
import { Component, OnInit, NgZone, OnChanges, DoCheck } from '@angular/core';
=======
import { Component, OnInit, NgZone } from '@angular/core';
>>>>>>> rmorigin/develop
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
export class RoomListComponent implements OnInit, OnChanges {
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
  roomList = [];
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

<<<<<<< HEAD
  ngOnChanges() {
    console.log('hello');
  }

  getRoomInfo() {
    this.roomList = [];
    this.roomListService.getRoomList()
    .subscribe((res: any) => {
      for (let i = 0; i < res.results.length; i++) {
        this.getRoomDetailinfo(res.results[i]);
        this.makeMarker(res.results[i]);
      }
    });
  }

  getRoomDetailinfo(res) {
    this.roomListService.getRoomDetailinfoService(res)
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

  setPrice() {
    this.roomList = [];
    const minValue = this.minValue;
    const maxValue = this.maxValue;
    this.roomListService.setPriceService(minValue, maxValue)
      .subscribe((res: any) => {
        for (let j = 0; j < res.results.length; j++) {
          console.log(res.results);
          this.getRoomInfo();
        }
        // console.log(res);
      });
    ;
  }
=======
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
>>>>>>> rmorigin/develop

  makeMarker(res) {
    const { image, id, title } = res;
    this.mapsService.getLatLan(res.address).subscribe(result => {
      this.ngzone.run(() => {
        this.Glat = result.lat();
        this.Glng = result.lng();
        const makerInfo = {
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

  chageStyle() {
    this.datestyle.width = 'auto';
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

  increase(n: number) {
    // console.log(n)
    if (n === 1) {
      this.Adultcounter++;
    } else if (n === 2) {
      this.Childcounter++;
    } else if (n === 3) {
      this.Youngcounter++;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
  }
  decrease(n: number) {
    if (n == 1) {
      if (this.Adultcounter === 0) {
        return;
      }
      this.Adultcounter--;
    } else if (n == 2) {
      if (this.Childcounter === 0) {
        return;
      }
      this.Childcounter--;
    } else if (n == 3) {
      if (this.Youngcounter === 0) {
        return;
      }
      this.Youngcounter--;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
  }

  toggleRemoveText(binput) {
    console.log(binput);
  }
}
