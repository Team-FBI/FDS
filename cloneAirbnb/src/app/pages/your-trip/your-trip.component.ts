import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';
import { ReservationInfoService } from '../../core/service/reservation-info.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-your-trip',
  templateUrl: './your-trip.component.html',
  styleUrls: ['./your-trip.component.scss']
})
export class YourTripComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient,
    private test: ReservationInfoService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;

    console.log(this.test.reservationInfoObj.destination);
    console.log(this.test.reservationInfoObj.checkIn);
    console.log(this.test.reservationInfoObj.checkOut);
    console.log(this.test.reservationInfoObj.adults);
    console.log(this.test.reservationInfoObj.children);
    console.log(this.test.reservationInfoObj.infants);
    console.log(this.test.reservationInfoObj.personnel);
  }
}
