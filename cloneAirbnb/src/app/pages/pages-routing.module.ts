import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorageListComponent } from './storage-list/storage-list.component';

const routes: Routes = [
  { path: 'storageList', component: StorageListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
