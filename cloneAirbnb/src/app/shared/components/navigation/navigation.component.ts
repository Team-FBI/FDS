import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReservationInfoService } from '../../../core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/service/language.service';
import { GoogleMapService } from 'src/app/pages/room-list/google-map.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { States } from '../../../core/interface/states.interface';
import { MenuService } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() initializeCurrentPage = new EventEmitter();
  isMain: boolean;
  myPage = false;
  switchLang: boolean;
  states = [];
  searchInputFocus = false;
  menuOpen = this.menuService.isOpen;
  menuStatus = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    public reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService,
    private translate: TranslateService,
    private languageService: LanguageService,
    private menuService: MenuService
  ) {
    this.translate = translate;
  }

  ngOnInit() {
    this.switchLang = this.languageService.language === 'en' ? true : false;
    this.isMain = this.router.url === '/home' ? true : false;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  showRoomList(destination: string, input: HTMLInputElement) {
    this.roomListService.roomList = [];
    this.roomListService.markers = [];
    this.roomListService.page = 1;
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

  openHamburgerMenu() {
    document
      .getElementById('hamburgerMenuControl')
      .classList.remove('hamburgerMenuClose');

    this.menuService.menuChangeDetect();
    this.menuOpen = this.menuService.isOpen;
    this.menuStatus = !this.menuStatus;
  }

  closeHamburgerMenu() {
    document
      .getElementById('hamburgerMenuControl')
      .classList.add('hamburgerMenuClose');

    this.menuService.menuChangeDetect();
    this.menuOpen = this.menuService.isOpen;
    this.menuStatus = !this.menuStatus;
  }
}
