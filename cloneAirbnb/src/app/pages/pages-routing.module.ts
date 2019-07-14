import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';

const routes: Routes = [
  { path: 'storageList', component: StorageListComponent },
  { path: 'yourTrip', component: YourTripComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
