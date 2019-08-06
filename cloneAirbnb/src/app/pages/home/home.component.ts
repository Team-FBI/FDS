import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  datePickerConfig: { containerClass: string; selectFromOtherMonth: boolean; };

  styleIncreasebtn1 = 1;
  styleIncreasebtn2 = 1;
  styleIncreasebtn3 = 1;
  increaseBtn1 = false;
  increaseBtn2 = false;
  increaseBtn3 = false;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    public reservationInfoService: ReservationInfoService,
    private roomListService: RoomListService // private spinner: NgxSpinnerService
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        isAnimated: true,
        containerClass: 'theme-red',
        selectFromOtherMonth: true
      }
    );
  }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    // this.spinner.show();

    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 1500);
  }

  increase(personnelType: HTMLSpanElement) {
    this.reservationInfoService.reservationInfoObj[personnelType.id]++;
    this.reservationInfoService.reservationInfoObj.personnel++;
    this.checkPersonnel();
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
    this.checkPersonnel();
  }

  checkPersonnel() {
    if ( this.adults >= 16) {
      this.increaseBtn1 = true;
      this.styleIncreasebtn1 = 0.1;
    } else {
      this.increaseBtn1 = false;
      this.styleIncreasebtn1 = 1;
    }

    if (this.children >= 5) {
      this.increaseBtn2 = true;
      this.styleIncreasebtn2 = 0.1;
    } else {
      this.increaseBtn2 = false;
      this.styleIncreasebtn2 = 1;
    }

    if (this.infants >= 5) {
      this.increaseBtn3 = true;
      this.styleIncreasebtn3 = 0.1;
    } else {
      this.increaseBtn3 = false;
      this.styleIncreasebtn3 = 1;
    }
  }

  checkInfants() {
    if (this.infants >= 5) {
      this.increaseBtn3 = true;
      this.styleIncreasebtn3 = 0.1;
    } else {
      this.increaseBtn3 = false;
      this.styleIncreasebtn3 = 1;
    }
  }

  sendReservationInfo(
    destination: HTMLInputElement,
    checkIn: HTMLInputElement,
    checkOut: HTMLInputElement
  ) {
    this.reservationInfoService.reservationInfoObj.destination =
      destination.value;
    if (checkIn.value && checkOut.value) {
      this.reservationInfoService.reservationInfoObj.checkIn = checkIn.value;
      this.reservationInfoService.reservationInfoObj.checkOut = checkOut.value;
    }

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
