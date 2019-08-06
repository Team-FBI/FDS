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
  checkIn = this.reservationInfo.reservationInfoObj.checkIn;
  checkOut = this.reservationInfo.reservationInfoObj.checkOut;
  personnel = this.reservationInfo.reservationInfoObj.personnel;
  price = this.reservationInfo.reservationInfoObj.price;
  roomType = this.reservationInfo.reservationInfoObj.roomType;
  rating = this.reservationInfo.reservationInfoObj.rating;

  checkInArray = this.checkIn.split('/');
  checkOutArray = this.checkOut.split('/');

  checkInNewDate = new Date(this.checkIn);
  checkOutNewDate = new Date(this.checkOut);

  dayDiff =
    (this.checkOutNewDate.getTime() - this.checkInNewDate.getTime()) /
    (1000 * 60 * 60 * 24);

  totalPriceBeforeTex = this.price * this.dayDiff;
  cleaningExpenses = 10000;
  serviceFee = this.totalPriceBeforeTex * 0.1;
  accommodationsTax = this.serviceFee * 0.1;
  totalPriceAfterTex =
    this.totalPriceBeforeTex +
    this.cleaningExpenses +
    this.serviceFee +
    this.accommodationsTax;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private reservationInfo: ReservationInfoService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }
}
