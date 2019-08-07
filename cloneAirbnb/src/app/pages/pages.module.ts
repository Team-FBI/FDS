import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import {
  BsDatepickerModule,
  BsDropdownModule,
  RatingModule,
  ModalModule,
  CarouselModule,
  PaginationModule
} from 'ngx-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeComponent } from './home/home.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomRegulationComponent } from './room-regulation/room-regulation.component';
import { RoomdetailInfoComponent } from './roomdetail-info/roomdetail-info.component';
import { RoomdetailpaymentComponent } from './roomdetailpayment/roomdetailpayment.component';
import { CheckPaymentComponent } from './check-payment/check-payment.component';
import { GuestInfoComponent } from './guest-info/guest-info.component';
import { PaymentComponent } from './payment/payment.component';

import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { ScrollDirective } from './room-detail/scroll.directive';
import { TripListComponent } from './trip-list/trip-list.component';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { ProfileComponent } from './profile/profile.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    HomeComponent,
    StorageListComponent,
    YourTripComponent,
    RoomListComponent,
    RoomRegulationComponent,
    GuestInfoComponent,
    PaymentComponent,
    RoomDetailComponent,
    RoomdetailpaymentComponent,
    RoomdetailInfoComponent,
    CheckPaymentComponent,
    ScrollDirective,
    TripListComponent,
    MessageComponent,
    MessageListComponent,
    TripDetailComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    BsDatepickerModule.forRoot(),
    AuthModule,
    ModalModule.forRoot(),
    SwiperModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3mYS53qBU6qHCKhyxke8JoYzrD5r2LJo'
    }),
    RatingModule.forRoot(),
    PaginationModule.forRoot(),
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RoomListComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class PagesModule {}
