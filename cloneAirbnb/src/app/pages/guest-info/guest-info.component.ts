import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';

import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { LanguageService } from 'src/app/core/service/language.service';

@Component({
  selector: 'app-guest-info',
  templateUrl: './guest-info.component.html',
  styleUrls: ['./guest-info.component.scss']
})
export class GuestInfoComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  toCheckPayment() {
    this.router.navigate(['checkpayment']);
  }
}
