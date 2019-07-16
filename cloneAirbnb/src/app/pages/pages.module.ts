import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthModule } from '../auth/auth.module';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal/';

@NgModule({
  declarations: [
    HomeComponent, 
    StorageListComponent, 
    YourTripComponent, 
    RoomListComponent, 
    RoomDetailComponent
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    SharedModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(), 
    AuthModule,
    FormsModule,  
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3mYS53qBU6qHCKhyxke8JoYzrD5r2LJo'
    })
],
})

export class PagesModule {
}
