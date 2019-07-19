import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthModule } from '../auth/auth.module';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { RoomRegulationComponent } from './room-regulation/room-regulation.component';
import { GuestInfoComponent } from './guest-info/guest-info.component';
import { PaymentComponent } from './payment/payment.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RoomdetailpaymentComponent } from './roomdetailpayment/roomdetailpayment.component';
import { RoomdetailInfoComponent } from './roomdetail-info/roomdetail-info.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    HomeComponent,
    StorageListComponent,
    YourTripComponent,
    RoomDetailComponent,
    RoomRegulationComponent,
    GuestInfoComponent,
    PaymentComponent,
    RoomdetailpaymentComponent,
    RoomdetailInfoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AuthModule,
    ModalModule.forRoot(),
    SwiperModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class PagesModule {}
