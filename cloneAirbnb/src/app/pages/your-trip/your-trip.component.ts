import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';

@Component({
  selector: 'app-your-trip',
  templateUrl: './your-trip.component.html',
  styleUrls: ['./your-trip.component.scss']
})
export class YourTripComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }
}
