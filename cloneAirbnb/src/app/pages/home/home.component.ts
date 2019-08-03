import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private roomListService: RoomListService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }


  increase(personnelType: HTMLSpanElement) {
    this.reservationInfoService.reservationInfoObj[personnelType.id]++;

    this.reservationInfoService.reservationInfoObj.personnel++;
  }

  decrease(personnelType: HTMLSpanElement) {
    if (
      personnelType.id === 'adults' &&
      this.reservationInfoService.reservationInfoObj[personnelType.id] === 1
    ) {
    } else {
      if (
        this.reservationInfoService.reservationInfoObj[personnelType.id] > 0
      ) {
        this.reservationInfoService.reservationInfoObj[personnelType.id]--;

        this.reservationInfoService.reservationInfoObj.personnel--;
      }
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
