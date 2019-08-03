import { Injectable } from '@angular/core';
import { ReservationInfo } from '../interface/reservationInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoService {
  date = new Date();

  initialCheckOutDate = new Date(this.date.getTime() + 2 * 1000 * 60 * 60 * 24);

  checkInDate = `${this.date.getMonth() +
    1}/${this.date.getDate()}/${this.date.getFullYear()}`;

  checkOutDate = `${this.initialCheckOutDate.getMonth() +
    1}/${this.initialCheckOutDate.getDate()}/${this.initialCheckOutDate.getFullYear()}`;

  messageCheckInDate = `${this.date.getFullYear()}-${this.date.getMonth() +
    1}-${this.date.getDate()}`;

  messageCheckOutDate = `${this.initialCheckOutDate.getFullYear()}-${this.initialCheckOutDate.getMonth() +
    1}-${this.initialCheckOutDate.getDate()}`;

  reservationInfoObj: ReservationInfo = {
    title: '',
    destination: '',
    checkIn: this.checkInDate,
    checkOut: this.checkOutDate,
    personnel: 1,
    adults: 1,
    children: 0,
    infants: 0,
    price: 0,
    roomType: ''
  };
  id: number;
}
