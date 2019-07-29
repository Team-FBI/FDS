import { Injectable } from '@angular/core';
import { ReservationInfo } from '../interface/reservationInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoService {
  reservationInfoObj: ReservationInfo = {
    title: '숙소이름',
    destination: '제주',
    checkIn: '07/26/2019',
    checkOut: '07/28/2019',
    personnel: 1,
    adults: 1,
    children: 0,
    infants: 0,
    price: 300000,
    roomType: '펜션'
  };
}
