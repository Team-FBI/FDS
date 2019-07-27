import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// import { PagesModule } from '../pages/pages.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [NavigationComponent, NotFoundComponent, FooterComponent],
  imports: [CommonModule, RouterModule, BsDropdownModule],
  exports: [NavigationComponent, NotFoundComponent, FooterComponent]
})
export class SharedModule {}
