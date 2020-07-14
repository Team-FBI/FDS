import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  currentPage = 1;
  appUrl: string = environment.appUrl;
  name
  language
  program
  hostAbout
  stateNmae
  durationTime
  detailCategory
  guestMaterial
  image1
  image2
  image3
  tripReviews

  
  constructor(
    private http: HttpClient
  ) { }



  ngOnInit() {
    this.http.get(`${this.appUrl}/trip/trips/11/`).subscribe(
      (res => {
        // console.log(res.trip_detail);
        // this.name = res.trip_detail.name;
        // this.language = res.trip_detail.language;
        // this.program = res.trip_detail.program;
        // this.hostAbout = res.trip_detail.host_about;
        // this.stateNmae = res.trip_detail.state.name;
        // this.durationTime = res.trip_detail.duration_time;
        // this.detailCategory = res.trip_detail.detail_category;
        // this.guestMaterial = res.trip_detail.guest_material;
        // this.image1 = res.trip_detail.image_1;
        // this.image2 = res.trip_detail.image_2;
        // this.image3 = res.trip_detail.image_3;
        // this.tripReviews = res.trip_reviews;
        // console.log(res.trip_detail.image_1);
      })
    );
  }

  initializeCurrentPage() {
    this.currentPage = 1;
  }

}
