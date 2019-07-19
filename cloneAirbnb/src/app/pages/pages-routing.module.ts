import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'storageList',
    component: StorageListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'yourTrip', component: YourTripComponent, canActivate: [AuthGuard] },
  {
    path: 'roomdetail',
    component: RoomDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
