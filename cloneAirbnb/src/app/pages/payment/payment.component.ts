import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) { }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

}
