import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomRegulationComponent } from './room-regulation/room-regulation.component';
import { GuestInfoComponent } from './guest-info/guest-info.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { PaymentComponent } from './payment/payment.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

import { AuthGuard } from '../core/guard/auth.guard';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'storageList',
    component: StorageListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'yourTrip', component: YourTripComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'roomList', component: RoomListComponent },
  {
    path: 'roomdetail/:id',
    component: RoomDetailComponent
  },
  {
    path: 'tripList',
    component: TripListComponent
  },
  {
    path: 'tripDetail',
    component: TripDetailComponent
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
  {
    path: 'checkpayment',
    component: CheckPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'messageList',
    component: MessageListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'message/:id',
    component: MessageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
