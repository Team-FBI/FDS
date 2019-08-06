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
import { BehaviorSubject } from 'rxjs';
import { RoomDetail } from 'src/app/core/interface/roomDetail.interface';
declare let Kakao: any;

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit, AfterViewInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  minDate: Date;
  maxDate: Date;
  modalRef: BsModalRef;
  personnel = this.reservationInfoService.reservationInfoObj.personnel;
  adults = this.reservationInfoService.reservationInfoObj.adults;
  children = this.reservationInfoService.reservationInfoObj.children;
  infants = this.reservationInfoService.reservationInfoObj.infants;
  price: number;
  min_stay: number;
  max_stay: number;
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
  // id = this.reservationInfoService.id;
  id: any;
  checked: boolean = true;

  isVisible: boolean = false;
  saveMsg = '삭제되었습니다';
  flag: boolean;
  timeOutID;

  // 달력 disable
  disabledDates = [];
  dateMove;
  strDate;
  listDate = [];
  isDate = false;
  endDate;
  endDate2;
  value;
  checkInDate: any;
  checkOutDate: any;
  dayDiff: any;
  overMinstay = false;
  overMaxstay = false;
  
  
  initCheckin = this.reservationInfoService.reservationInfoObj.checkIn;
  initCheckOut = this.reservationInfoService.reservationInfoObj.checkOut;
  date = new Date();

  initialCheckOutDate = this.reservationInfoService.initialCheckOutDate;
  
  // checkInDate = `${this.initCheckin.split('/')}`;

  trcheckInDate = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;

  trcheckOutDate = `${this.initialCheckOutDate.getFullYear()
  }-${this.initialCheckOutDate.getMonth() + 1}-${this.initialCheckOutDate.getDate()}`;
  // checkOutDate = `${this.initialCheckOutDate.getMonth() +
  //   1}/${this.initialCheckOutDate.getDate()}/${this.initialCheckOutDate.getFullYear()}`;

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

    Kakao.Link.createDefaultButton({
      container: '#shareBtn',
      objectType: 'feed',
      content: {
        title: document.title,
        description: '내용, 주로 해시태그',
        imageUrl: document.images[0].src,
        link: {
          webUrl: document.location.href,
          mobileWebUrl: document.location.href
        }
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845
      },
      buttons: [
        {
          title: 'Open!',
          link: {
            mobileWebUrl: document.location.href,
            webUrl: document.location.href
          }
        }
      ]
    });

    this.endDate = this.reservationInfoService.reservationInfoObj.checkIn;
    this.endDate2 = this.reservationInfoService.reservationInfoObj.checkOut;

    this.id = this.router.url.split('/');
    this.isLoading$.next(true);
    this.http.get(`${this.appUrl}/rooms/${this.id[this.id.length -1]}/`).subscribe(
      (res: any) => {
      this.price = res.price;
      this.reservationInfoService.reservationInfoObj.price = res.price;
      this.min_stay = res.min_stay;
      this.max_stay = res.max_stay;
      this.totalprice = this.price * this.min_stay * this.personnel;
      this.serviceprice = this.totalprice * 0.13;
      this.Accommodation = this.serviceprice * 0.1;
      this.finalprice =
        this.totalprice + this.serviceprice + this.Accommodation;
      this.total_rating = res.total_rating;
      this.image = res.image;
      this.image_1 = res.image_1;
      this.image_2 = res.image_2;
      this.image_3 = res.image_3;
      this.image_4 = res.image_4;
      res.reservations.forEach(element => {
        this.getDateRange(element[0], element[1], this.listDate);
      });
      this.setDisableDate();

      this.checkInDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
      this.checkOutDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);

    },
    err => {},
    () => {
      this.isLoading$.next(false);
    }
    );
  }

  test() {
    this.isOpen = !this.isOpen;
  }

  increase(n: number) {
    if (n === 1) {
      this.adults++;
    } else if (n === 2) {
      this.children++;
    } else if (n === 3) {
      this.infants++;
    }
    this.personnel = this.adults + this.children + this.infants;
    this.totalprice = this.price * this.min_stay * this.personnel;
    this.serviceprice = this.totalprice * 0.1;
    this.Accommodation = this.serviceprice * 0.1;
    this.finalprice = this.totalprice + this.serviceprice + this.Accommodation;
  }

  decrease(n: number) {
    if (n === 1) {
      if (this.adults === 0) {
        return;
      }
      this.adults--;
    } else if (n === 2) {
      if (this.children === 0) {
        return;
      }
      this.children--;
    } else if (n === 3) {
      if (this.infants === 0) {
        return;
      }
      this.infants--;
    }
    this.personnel = this.adults + this.children + this.infants;
    this.totalprice = this.price * this.min_stay * this.personnel;
    this.serviceprice = this.totalprice * 0.13;
    this.Accommodation = this.serviceprice * 0.1;
    this.finalprice = this.totalprice + this.serviceprice + this.Accommodation;
  }

  ngAfterViewInit() {
    this.galleryTop.nativeElement.swiper.controller.control = this.galleryThumbs.nativeElement.swiper;
    this.galleryThumbs.nativeElement.swiper.controller.control = this.galleryTop.nativeElement.swiper;
  }

  changeSaveBtn() {
    this.checked = !this.checked;
    this.isVisible = true;
    clearTimeout(this.timeOutID);
    if (this.saveMsg === '삭제되었습니다') {
      this.saveMsg = '저장되었습니다';
    } else {
      this.saveMsg = '삭제되었습니다';
    }
    this.timeOutID = setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  posibleMaxMin(minstay, maxstay) {
    minstay = new Date(minstay);
    maxstay = new Date(maxstay);
    this.dayDiff = (maxstay.getTime() - minstay.getTime()) / (1000 * 60 * 60 * 24);

    if (this.dayDiff < this.min_stay) {
      this.overMinstay = true;
    } else {
      this.overMinstay = false;
    }

    if (this.dayDiff > this.max_stay) {
      this.overMaxstay = true;
    } else {
      this.overMaxstay = false;
    }
  }

  toRoomRegulation() {
    this.router.navigate(['roomregulation']);
  }

  setregulation() {
    this.reservationInfoService.reservationInfoObj.price = this.price;
  }

  getDateRange(startDate, endDate, listDate) {
    this.dateMove = new Date(startDate);
    this.strDate = startDate;
    if (startDate === endDate) {
      this.strDate = this.dateMove.toISOString().slice(0, 10);
      listDate.push(this.strDate);
    } else {
      while (this.strDate < endDate) {
        this.strDate = this.dateMove.toISOString().slice(0, 10);
        listDate.push(this.strDate);
        this.dateMove.setDate(this.dateMove.getDate() + 1);
      }
    }
    return listDate;
  }
  
  onValueChange(value: any): void {
    this.listDate = [];
    this.endDate = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    
    this.getDateRange('2019-07-31', this.endDate, this.listDate);

    this.reservationInfoService.reservationInfoObj.checkIn = this.endDate;
    this.posibleMaxMin(this.endDate, this.endDate2);
  }

  onValueChange2(value: any): void {
    this.endDate2 = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;

    this.reservationInfoService.reservationInfoObj.checkOut = this.endDate2;
    this.posibleMaxMin(this.endDate, this.endDate2);
  }

  setDisableDate() {
    this.listDate.forEach(element => {
      this.disabledDates.push(new Date(element));
    });
  }
}
