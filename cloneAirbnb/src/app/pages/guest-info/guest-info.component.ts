import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';

import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { LanguageService } from 'src/app/core/service/language.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
  styleUrls: ['./guest-info.component.scss']
})
export class GuestInfoComponent implements OnInit {
  personnel = this.reservationInfoService.reservationInfoObj.personnel;
  switchLang = this.languageService.language === 'en' ? true : false;
  appUrl: string = environment.appUrl;
  isEmpty = true;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private reservationInfoService: ReservationInfoService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  changeIsEmpty(userMessage: HTMLTextAreaElement) {
    if (userMessage.value.trim()) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  toCheckPayment(userMessage: HTMLTextAreaElement) {
    if (userMessage.value.trim()) {
      const id = this.reservationInfoService.id;
      const payload = {
        start_date: this.refactoringDate('checkIn'),
        end_date: this.refactoringDate('checkOut'),
        message: userMessage.value
      };

      this.http.post(`${this.appUrl}/rooms/${id}`, payload).subscribe();
      this.router.navigate(['yourTrip']);
    }
  }

  refactoringDate(checkInOut: string) {
    const messageCheckInDateArray = [];
    const splitDate = this.reservationInfoService.reservationInfoObj[
      checkInOut
    ].split('/');
    for (const date of splitDate) {
      if (date.length === 4) {
        messageCheckInDateArray.unshift(date);
      } else {
        messageCheckInDateArray.push(date);
      }
    }
    return messageCheckInDateArray.join('-');
  }

  switchLanguage() {
    const language = this.switchLang ? 'ko' : 'en';
    this.languageService.switchLanguageService(language);
    this.switchLang = !this.switchLang;
  }
}
