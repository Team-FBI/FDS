import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language = 'en';

  constructor(public translate: TranslateService) {}

  currentLanguage() {
    return this.language;
  }

  switchLanguageService(language: string) {
    this.language = language;
    return this.translate.use(language);
  }
}
