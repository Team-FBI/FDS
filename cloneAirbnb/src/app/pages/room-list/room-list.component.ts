import { Component, OnInit } from '@angular/core';
import { Options } from 'selenium-webdriver/edge';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent  {
  latitude = 33.36995865711402;
  longitude = 126.52811723292518;
  selectedMarker;
  markers = [
    { lat: 33.36995865711402, lng: 126.52811723292518, alpha: 1 },
    { lat: 33.36995865711402, lng: 126.54811723292518, alpha: 1 }
  ];
  imgsrc = [
    'https://a0.muscache.com/im/pictures/8cca891c-d4c2-45f0-9623-0c7c0f46fccf.jpg?aki_policy=large',
    'https://a0.muscache.com/im/pictures/89587324/26c55a69_original.jpg?aki_policy=large'
  ]
  
  addMarker(lat: number, lng: number) {
    this.markers.push({ lat, lng, alpha: 0.4 });
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

  markerClose(){
    // console.log();
  }
}
