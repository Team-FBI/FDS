import { Component, OnInit } from '@angular/core';
import { TripListService } from 'src/app/core/service/trip-list.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  tripList = this.triplistservice.tripList;
  personnel = 1;
  minValue = 0;
  maxValue = 1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    translate: (value: number): string => {
      return '￦' + value;
    }
  };
  myDateValue: Date;
  Allcounter = 0;
  Adultcounter = 0;
  Childcounter = 0;
  Youngcounter = 0;
  reservationInfoService: any;

  constructor(
    private triplistservice: TripListService
  ) { }

  ngOnInit() {
    this.getTripInfo();
  }
  
  getTripInfo() {
    this.triplistservice.getTripList().subscribe(
      (triplist: any) => {
        for (const trip of triplist) {
          this.triplistservice.tripList.push(trip);
        }
      }
    );
  }

  increase(personnelType: HTMLSpanElement) {
    this.reservationInfoService.tr [personnelType.id]++;

    this.reservationInfoService.reservationInfoObj.personnel++;
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
  }
}
