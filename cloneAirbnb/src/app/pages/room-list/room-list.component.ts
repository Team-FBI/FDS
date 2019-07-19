import { Component, OnInit, NgZone, OnChanges } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Options } from 'ng5-slider';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';
import { GoogleMapService } from './google-map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  //백엔드 연결 URL
  appUrl: string = environment.appUrl;
  
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
    'width': '52px'
  };
  
  // price range 데이터
  minValue: number = 0;
  maxValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number): string => {
      return '￦' + value;
    },
  };
  priceToggle: boolean;

  // 방 목록  
  roomList = [];

  constructor(
    private http: HttpClient,
    private mapsService: GoogleMapService,
    private ngzone: NgZone,
    private router: Router, ) {

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
    this.getRoomlist();
  }

  getRoomlist() {
    this.http.get(`${this.appUrl}/rooms/`)
      .subscribe(
        (res: any) => {
          for (let i = 0; i < res.length; i++) {
            this.addRoomlist(res[i]);
            this.makeMarker(res[i]);
          }
        }
      );
  }

  setPrice() {
    this.http.get(`${this.appUrl}/rooms/?min_price=${this.minValue}&&max_price=${this.maxValue}`)
      .subscribe(
        (res: any) => {
          for ( let j = 0; j < res.length; j++) {
            this.roomList = [];
            this.addRoomlist(res[j]);
          }
          console.log(res);
          }
      );
  }

  addRoomlist(res) {
    this.http.get(`${this.appUrl}/rooms/${res.id}`)
      .subscribe(
        (res: any) => {
          const { image, id, title, capacity, bedroom, bathroom } = res;
          let { room_type, space, bed_type } = res;
          if (room_type === 1){
            room_type = '아파트';
          } else if (room_type === 2) {
            room_type = '개인집';
          } else if (room_type === 3) {
            room_type = '가든하우스';
          } else if (room_type === 4) {
            room_type = '침대와 아침식사';
          } else if (room_type === 5) {
            room_type = '빌라';
          } else if (room_type === 6) {
            room_type = '카라반';
          } else if (room_type === 50) {
            room_type = '사무실';
          } else {
            room_type = '';
          }
          if (space === 1){
            space = '전체';
          } else if ( space === 2) {
            space = '개인 방';
          } else if ( space === 3) {
            space = '공동사용';
          } else {
            space = '';
          }
          if ( bed_type === 1 ) {
            bed_type = '개인 침실';
          } else if ( bed_type === 2 ) {
            bed_type = '공용 침실';
          } else {
            bed_type = '';
          }
          const roominfo = {
            id,
            image,
            title,
            room_type,
            capacity,
            space,
            bed_type,
            bedroom,
            bathroom
          };
          this.roomList.push(roominfo);
        }
      );
  }

  makeMarker(res) {
    this.getAddress(res);
  }

  getAddress(res) {
    const { image, id, title} = res;
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
      if (this.Adultcounter === 0) { return; }
      this.Adultcounter--;
    } else if (n == 2) {
      if (this.Childcounter === 0) { return; }
      this.Childcounter--;
    } else if (n == 3) {
      if (this.Youngcounter === 0) { return; }
      this.Youngcounter--;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
  }

  toggleRemoveText(binput){
    console.log(binput);
  }
}
