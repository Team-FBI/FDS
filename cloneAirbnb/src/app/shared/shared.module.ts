import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NavigationComponent, NotFoundComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [NavigationComponent, NotFoundComponent]
})
export class SharedModule {}
