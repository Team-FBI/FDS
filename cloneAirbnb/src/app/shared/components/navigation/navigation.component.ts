import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReservationInfoService } from '../../../core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { Result } from 'src/app/core/interface/roomList.interface';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/service/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isMain: boolean;
  myPage = false;
  switchLang = true;

  constructor(
    private router: Router,
    public authService: AuthService,
    public reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.translate = translate;
  }

  ngOnInit() {
    this.isMain = this.router.url === '/home' ? true : false;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  showRoomList(destination: string) {
    this.roomListService.roomList = [];
    this.reservationInfoService.reservationInfoObj.destination = destination;
    this.roomListService.getRoomList().subscribe(res => {
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
      }
      this.roomListService.roomChangeDetect();
    });

    this.router.navigate(['roomList']);
  }

  signOutBtn() {
    this.authService.signOutUser();
  }

  switchLanguage() {
    const language = this.switchLang ? 'ko' : 'en';
    this.languageService.switchLanguageService(language);
    this.switchLang = !this.switchLang;
  }
}
