import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  active= false;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    public reservationInfoService: ReservationInfoService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

  get adults() {
    return this.reservationInfoService.reservationInfoObj.adults;
  }

  get children() {
    return this.reservationInfoService.reservationInfoObj.children;
  }

  get infants(){
    return this.reservationInfoService.reservationInfoObj.infants;
  }

  increase(a: HTMLSpanElement){
    this.reservationInfoService.reservationInfoObj[a.id] ++;
  }
  
  decrease(a: HTMLSpanElement){
    if(this.reservationInfoService.reservationInfoObj[a.id] > 0){
      this.reservationInfoService.reservationInfoObj[a.id] --;
    }
  }

  sendReservationInfo(
    destination: HTMLInputElement, 
    checkIn: HTMLInputElement, 
    checkOut: HTMLInputElement, 
    adult: HTMLSpanElement, 
    child: HTMLSpanElement, 
    infant: HTMLSpanElement){
    this.reservationInfoService.reservationInfoObj.destination = destination.value;
    this.reservationInfoService.reservationInfoObj.checkIn = checkIn.value;
    this.reservationInfoService.reservationInfoObj.checkOut = checkOut.value;
    this.reservationInfoService.reservationInfoObj.personnel = Number(adult.innerHTML) + Number(child.innerHTML) + Number(infant.innerHTML)
  }

  counterActive(){
    this.active= !this.active
  }
  
}
