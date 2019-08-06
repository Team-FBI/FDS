import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';
import { ReservationInfoService } from '../../core/service/reservation-info.service';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-your-trip',
  templateUrl: './your-trip.component.html',
  styleUrls: ['./your-trip.component.scss']
})
export class YourTripComponent implements OnInit {
  appUrl: string = environment.appUrl;

  end = [];
  start = [];
  
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    const id = localStorage.getItem('userId')

    this.http.get(`${this.appUrl}/accounts/user/${id}/`).subscribe((res:any) => {
      // console.log(res.reservations)
      for(const i of res.reservations){
        const key = Object.keys(i).join('');
        // console.log(key)
        
        //  console.log(this.parseDate(i[key].end_date))
        console.log(this.end.push(this.parseDate(i[key].end_date)));        
      }

    })
  }

  parseDate(str) {
    const mdy = str.split('-');
    console.log(mdy);
    return new Date(mdy[0], mdy[1] - 1, mdy[2]) > new Date() ? true : false;
  }

}
