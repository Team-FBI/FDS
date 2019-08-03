import { Component, OnInit } from '@angular/core';
import { TripListService } from 'src/app/core/service/trip-list.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  tripList = this.triplistservice.tripList;

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
}
