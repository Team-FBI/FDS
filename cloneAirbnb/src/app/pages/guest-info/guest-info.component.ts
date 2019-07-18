import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
  styleUrls: ['./guest-info.component.scss']
})
export class GuestInfoComponent implements OnInit {

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) { }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

}
