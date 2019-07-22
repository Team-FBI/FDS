import { Injectable } from '@angular/core';
import { ReservationInfo } from '../interface/reservationInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationInfoService {
  
  reservationInfoObj: ReservationInfo = {
    destination: '',
    checkIn: '',
    checkOut: '',
    personnel: 0,
    adults: 0,
    children: 0,
    infants: 0
  };

}
