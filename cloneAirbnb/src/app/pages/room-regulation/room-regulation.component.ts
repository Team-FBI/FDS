import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { TranslateService } from '@ngx-translate/core';

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

  week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  checkInArray = this.checkIn.split('/');
  checkOutArray = this.checkOut.split('/');

  checkInNewDate = new Date(this.checkIn);
  checkOutNewDate = new Date(this.checkOut);

  dayDiff =
    (this.checkOutNewDate.getTime() - this.checkInNewDate.getTime()) /
    (1000 * 60 * 60 * 24);

  switchLang = this.languageService.language === 'en' ? true : false;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private reservationInfo: ReservationInfoService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
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

  switchLanguage() {
    const language = this.switchLang ? 'ko' : 'en';
    this.languageService.switchLanguageService(language);
    this.switchLang = !this.switchLang;
  }

  get getCheckInDay() {
    return this.week[new Date(this.checkDay(this.checkIn)).getDay()];
  }

  get getCheckOutDay() {
    return this.week[new Date(this.checkDay(this.checkOut)).getDay()];
  }

  toGuestInfo() {
    this.router.navigate(['guestinfo']);
  }
}
