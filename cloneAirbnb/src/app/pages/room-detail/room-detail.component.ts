import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormGroup, FormControl } from '@angular/forms';
import { ReservationInfoService } from '../../core/service/reservation-info.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {
  minDate: Date;
  maxDate: Date;
  modalRef: BsModalRef;
  Allcounter = 1;
  Adultcounter = 1;
  Childcounter = 0;
  Youngcounter = 0;
  price: number;
  min_stay: number;
  appUrl: string = environment.appUrl;
  totalprice: number;
  serviceprice: number;
  Accommodation: number;
  finalprice: number;
  total_rating: number;
  image: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  max: number = 10;
  rate: number = 7;
  id: number;

  checked: boolean = true;

  @ViewChild('galleryTop', { static: true }) galleryTop;
  @ViewChild('galleryThumbs', { static: true }) galleryThumbs;
  isOpen = false;

  galleryTopConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  galleryThumbsConfig: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 9,
    centeredSlides: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true
  };

  config = {
    ignoreBackdropClick: true
  };

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router,
    private urlRemember: UrlRememberService,
    private reservationInfoService: ReservationInfoService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 180);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  roomlistopenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.id = this.reservationInfoService.id;
    
    // this.http.get(`${this.appUrl}/rooms/`)
    //   .subscribe(res => console.log(res))

    this.http.get(`${this.appUrl}/rooms/${this.id}/`)
      .subscribe( (res: any) => { 
        // console.log(res)
        this.price = res.price;
        this.reservationInfoService.reservationInfoObj.price = res.price;
        this.min_stay = res.min_stay;
        this.totalprice = this.price* this.min_stay * this.Allcounter;
        this.serviceprice = this.totalprice * 0.13;
        this.Accommodation = this.serviceprice *0.10;
        this.finalprice = this.totalprice + this.serviceprice + this.Accommodation;
        this.total_rating = res.total_rating;
        this.image = res.image;
        this.image_1 = res.image_1;
        this.image_2 = res.image_2;
        this.image_3 = res.image_3;
        this.image_4 = res.image_4;
    });
  }

  test() {
    this.isOpen = !this.isOpen
    console.log(1)
  }

  increase(n: number) {
    // console.log(n)
    if (n === 1) {
      this.Adultcounter++;
    } else if (n == 2) {
      this.Childcounter++;
    } else if (n == 3) {
      this.Youngcounter++;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
    this.totalprice = this.price * this.min_stay * this.Allcounter;
    this.serviceprice = this.totalprice * 0.13;
    this.Accommodation = this.serviceprice * 0.1;
    this.finalprice = this.totalprice + this.serviceprice + this.Accommodation;
  }

  decrease(n: number) {
    if (n == 1) {
      if (this.Adultcounter === 0) {
        return;
      }
      this.Adultcounter--;
    } else if (n == 2) {
      if (this.Childcounter === 0) {
        return;
      }
      this.Childcounter--;
    } else if (n == 3) {
      if (this.Youngcounter === 0) {
        return;
      }
      this.Youngcounter--;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
    this.totalprice = this.price * this.min_stay * this.Allcounter;
    this.serviceprice = this.totalprice * 0.13;
    this.Accommodation = this.serviceprice * 0.1;
    this.finalprice = this.totalprice + this.serviceprice + this.Accommodation;
  }

  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  changesavebtn() {
    this.checked = !this.checked;
  }

  toRoomRegulation() {
    this.router.navigate(['roomregulation']);
  }

  setregulation(){
    this.reservationInfoService.reservationInfoObj.price = this.price;
  }
  

}






