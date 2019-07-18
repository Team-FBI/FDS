import { Component, OnInit } from '@angular/core';
import { ZoomControlOptions, ControlPosition, ZoomControlStyle } from '@agm/core/services/google-maps-types';
import { AgmInfoWindow, InfoWindowManager } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  myDateValue: Date;
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

  constructor(private http: HttpClient) {
    this.currentIW = null;
    this.previousIW = null;
    console.log(this.appUrl);
  }
    

  ngOnInit() {
    this.http.get(`${this.appUrl}`)
      .subscribe(res => console.log(res));
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

}
