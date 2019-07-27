import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  title = this.reservationInfo.reservationInfoObj.title;
  destination = this.reservationInfo.reservationInfoObj.destination;
  checkIn = this.reservationInfo.reservationInfoObj.checkIn;
  checkOut = this.reservationInfo.reservationInfoObj.checkOut;
  personnel = this.reservationInfo.reservationInfoObj.personnel;
  price = this.reservationInfo.reservationInfoObj.price;
  roomType = this.reservationInfo.reservationInfoObj.roomType;

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
}
