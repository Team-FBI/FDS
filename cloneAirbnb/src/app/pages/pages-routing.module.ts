import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomRegulationComponent } from './room-regulation/room-regulation.component';
import { PaymentComponent } from './payment/payment.component';
import { GuestInfoComponent } from './guest-info/guest-info.component';
import { RoomdetailInfoComponent } from './roomdetail-info/roomdetail-info.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'storageList', component: StorageListComponent },
  { path: 'yourTrip', component: YourTripComponent },
  { path: 'roomdetail', component: RoomDetailComponent },
  { path: 'roomregulation', component: RoomRegulationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'guestinfo', component: GuestInfoComponent },
  { path: 'roomdetailinfo', component: RoomdetailInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
