import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-your-trip',
  templateUrl: './your-trip.component.html',
  styleUrls: ['./your-trip.component.scss']
})
export class YourTripComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;

    this.http
      .get('http://airbnb.tthae.com/api/accounts/user/13/')
      .subscribe(res => console.log(res));
  }
}
