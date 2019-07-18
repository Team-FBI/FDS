import { Component, OnInit } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Options, LabelType } from 'ng5-slider';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  myDateValue: Date;
  Allcounter = 0;
  Adultcounter = 0;
  Childcounter = 0;
  Youngcounter = 0;
  latitude = 33.36995865711402;
  longitude = 126.52811723292518;
  selectedMarker;
  infowindowManager: InfoWindowManager;
  currentIW: AgmInfoWindow;
  previousIW: AgmInfoWindow;
  markers = [
    {
      id: 1, lat: 33.36995865711402, lng: 126.52811723292518, alpha: 1, content: 'css',
      url: 'https://a0.muscache.com/im/pictures/8cca891c-d4c2-45f0-9623-0c7c0f46fccf.jpg?aki_policy=large',
      disabled: false
    },
    {
      id: 2, lat: 33.36995865711402, lng: 126.54811723292518, alpha: 1, content: 'html',
      url: 'https://a0.muscache.com/im/pictures/89587324/26c55a69_original.jpg?aki_policy=large',
      disabled: false
    }
  ];
  zoomControlOptions: ZoomControlOptions = {
    position: ControlPosition.LEFT_TOP,
    style: ZoomControlStyle.LARGE
  };
  previous: any;
  icon = {
    url: 'https://i.dlpng.com/static/png/510666_thumb.png',
    scaledSize: { width: 50, height: 60 }
  };
  appUrl: string = environment.appUrl;
  minValue: number = 0;
  maxValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number): string => {
      return '￦' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };
  priceToggle: boolean;
  dateCustomClasses: DatepickerDateCustomClasses[];

  constructor(private http: HttpClient) {
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
  datestyle = {
    'width' : '52px'
  };
  roomimage: string;

  ngOnInit() {
    this.http.get(`${this.appUrl}/rooms/2`)
      .subscribe((res: any) => this.roomimage = res.image);
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
    } else if (n == 2) {
      this.Childcounter++;
    } else if (n == 3) {
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
