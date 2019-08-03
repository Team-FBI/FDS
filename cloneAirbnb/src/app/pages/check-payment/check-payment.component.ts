import { Component, OnInit } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons/faCcAmex';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/service/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent implements OnInit {
  faCreditCard = faCreditCard;
  faCcMastercard = faCcMastercard;
  faCcVisa = faCcVisa;
  faCcAmex = faCcAmex;
  toggleCard = false;
  switchLang = this.languageService.language === 'en' ? true : false;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.setDefaultLang(`${this.languageService.currentLanguage()}`);
  }

  addCard() {
    if (this.toggleCard) {
      this.toggleCard = false;
    } else {
      this.toggleCard = true;
    }
  }

  toYourTrip() {
    this.router.navigate(['yourTrip']);
  }

  switchLanguage() {
    const language = this.switchLang ? 'ko' : 'en';
    this.languageService.switchLanguageService(language);
    this.switchLang = !this.switchLang;
  }
}
