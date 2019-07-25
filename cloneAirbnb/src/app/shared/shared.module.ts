import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// import { PagesModule } from '../pages/pages.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavigationComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule, BsDropdownModule],
  exports: [NavigationComponent, NotFoundComponent]
})
export class SharedModule {}
