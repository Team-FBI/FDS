import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomRegulationComponent } from './room-regulation/room-regulation.component';
import { GuestInfoComponent } from './guest-info/guest-info.component';
import { PaymentComponent } from './payment/payment.component';

import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'storageList',
    component: StorageListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'yourTrip', component: YourTripComponent, canActivate: [AuthGuard] },
  { path: 'roomList', component: RoomListComponent },
  {
    path: 'roomdetail',
    component: RoomDetailComponent
  },
  {
    path: 'roomregulation',
    component: RoomRegulationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'guestinfo',
    component: GuestInfoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
