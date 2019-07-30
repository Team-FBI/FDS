import { Injectable } from '@angular/core';
import { ReservationInfo } from '../interface/reservationInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoService {
  date = new Date();

  checkInDate = `${this.date.getMonth() +
    1}/${this.date.getDate()}/${this.date.getFullYear()}`;

  checkOutDate = `${this.date.getMonth() +
    1}/${this.date.getDate()}/${this.date.getFullYear()}`;

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
}
