import { Injectable } from '@angular/core';
import { ReservationInfo } from '../interface/reservationInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoService {
  reservationInfoObj: ReservationInfo = {
    title: '',
    destination: '',
    checkIn: '',
    checkOut: '',
    personnel: 1,
    adults: 1,
    children: 0,
    infants: 0,
    price: 0,
    roomType: ''
  };
}
