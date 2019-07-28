import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(public translate: TranslateService) {}

  currentLanguage() {
    return 'en';
  }

  switchLanguageService(language: string) {
    return this.translate.use(language);
  }
}
