import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomListComponent } from './room-list/room-list.component';

@NgModule({
  declarations: [HomeComponent, StorageListComponent, YourTripComponent, RoomListComponent],
  imports: [CommonModule, PagesRoutingModule, SharedModule]
})
export class PagesModule {}
