import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReservationInfoService } from '../../../core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/service/language.service';
import { GoogleMapService } from 'src/app/pages/room-list/google-map.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { States } from 'src/app/core/interface/states.interface';
import { RoomListComponent } from 'src/app/pages/room-list/room-list.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isMain: boolean;
  myPage = false;
  switchLang = true;
  states = [];
  searchInputFocus = false;


  constructor(
    private router: Router,
    public authService: AuthService,
    public reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private roomListComponent: RoomListComponent
  ) {
    this.translate = translate;
  }

  ngOnInit() {
    this.isMain = this.router.url === '/home' ? true : false;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  showRoomList(destination: string, input: HTMLInputElement) {
    this.roomListService.roomList = [];
    this.roomListService.markers = [];
    this.roomListService.page = 1;
    this.roomListComponent.currentPage = 1;
    input.value = '';
    this.searchInputFocus = false;
    this.reservationInfoService.reservationInfoObj.destination = destination;
    this.roomListService.getRoomList().subscribe(res => {
      for (const room of res.results) {
        this.roomListService.roomList.push(room);
        this.roomListService.getMarkerLatLan(room);
      }
      this.roomListService.roomChangeDetect();
    });

    this.router.navigate(['roomList']);
  }

  stateSuggestion(input: HTMLInputElement) {
    this.states = [];
    this.roomListService
      .getState(input.value)
      .subscribe((res: Array<States>) => {
        for (const state of res) {
          this.states.push(state);
        }
      });
  }

  searchInputFocusout() {
    setTimeout(() => {
      this.searchInputFocus = false;
    }, 200);
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
