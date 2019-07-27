import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    public reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

  increase(personnelType: HTMLSpanElement) {
    this.reservationInfoService.reservationInfoObj[personnelType.id]++;

    this.reservationInfoService.reservationInfoObj.personnel++;
  }

  decrease(personnelType: HTMLSpanElement) {
    if (this.reservationInfoService.reservationInfoObj[personnelType.id] > 0) {
      this.reservationInfoService.reservationInfoObj[personnelType.id]--;

      this.reservationInfoService.reservationInfoObj.personnel--;
    }
  }

  sendReservationInfo(
    destination: HTMLInputElement,
    checkIn: HTMLInputElement,
    checkOut: HTMLInputElement
  ) {
    this.reservationInfoService.reservationInfoObj.destination =
      destination.value;
    this.reservationInfoService.reservationInfoObj.checkIn = checkIn.value;
    this.reservationInfoService.reservationInfoObj.checkOut = checkOut.value;

    this.roomListService.roomList = [];
    this.router.navigate(['roomList']);
  }

  get adults() {
    return this.reservationInfoService.reservationInfoObj.adults;
  }

  get children() {
    return this.reservationInfoService.reservationInfoObj.children;
  }

  get infants() {
    return this.reservationInfoService.reservationInfoObj.infants;
  }

  get personnel() {
    return this.reservationInfoService.reservationInfoObj.personnel;
  }
}
