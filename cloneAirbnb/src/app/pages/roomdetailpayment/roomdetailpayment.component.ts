import { Component, OnInit } from '@angular/core';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roomdetailpayment',
  templateUrl: './roomdetailpayment.component.html',
  styleUrls: ['./roomdetailpayment.component.scss']
})
export class RoomdetailpaymentComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  modalRef: BsModalRef;
  Allcounter = 0;
  Adultcounter = 0;
  Childcounter = 0;
  Youngcounter = 0;
  appUrl: string = environment.appUrl;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }

}
