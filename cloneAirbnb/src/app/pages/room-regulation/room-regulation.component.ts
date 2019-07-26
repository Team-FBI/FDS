import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';

@Component({
  selector: 'app-room-regulation',
  templateUrl: './room-regulation.component.html',
  styleUrls: ['./room-regulation.component.scss']
})
export class RoomRegulationComponent implements OnInit {
  title = this.reservationInfo.reservationInfoObj.title;
  destination = this.reservationInfo.reservationInfoObj.destination;
  checkIn = this.reservationInfo.reservationInfoObj.checkIn;
  checkOut = this.reservationInfo.reservationInfoObj.checkOut;

  week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  checkInArray = this.checkIn.split('/');
  checkOutArray = this.checkOut.split('/');

  checkInNewDate = new Date(this.checkIn);
  checkOutNewDate = new Date(this.checkOut);

  dayDiff =
    (this.checkOutNewDate.getTime() - this.checkInNewDate.getTime()) /
    (1000 * 60 * 60 * 24);

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private reservationInfo: ReservationInfoService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

  checkDay(day: string) {
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

  get getCheckInDay() {
    return this.week[new Date(this.checkDay(this.checkIn)).getDay()];
  }

  get getCheckOutDay() {
    return this.week[new Date(this.checkDay(this.checkOut)).getDay()];
  }
}
