import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavigationComponent, NotFoundComponent],
  imports: [CommonModule, SharedRoutingModule, RouterModule],
  exports: [NavigationComponent, NotFoundComponent]
})
export class SharedModule {}
