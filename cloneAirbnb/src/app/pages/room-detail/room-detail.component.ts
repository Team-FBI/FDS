import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Renderer2
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
import { style } from '@angular/animations';
import { element } from 'protractor';
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
  // adults = this.reservationInfoService.reservationInfoObj.adults;
  // children = this.reservationInfoService.reservationInfoObj.children;
  // infants = this.reservationInfoService.reservationInfoObj.infants;
  price: number;
  min_stay: number;
  max_stay: number;
  appUrl: string = environment.appUrl;
  totalPriceBeforeTex: number;
  cleaningExpenses = 10000;
  serviceFee: number;
  accommodationsTax: number;
  totalPriceAfterTex: number;
  total_rating: number;
  image: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
  max: number = 10;
  capacity: number;
  // id = this.reservationInfoService.id;
  id: any;
  checked = true;

  isVisible = false;
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
  compareDate = false;
  blockSend = true;
  styleIncreasebtn1 = 1;
  styleIncreasebtn2 = 1;
  styleIncreasebtn3 = 1;
  capacity: number;
  increaseBtn1 = false;
  increaseBtn2 = false;
  increaseBtn3 = false;
  pricecheckInDate: any;
  pricecheckOutDate: any;

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
  btnOpacity = '1';

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router,
    private urlRemember: UrlRememberService,
    private reservationInfoService: ReservationInfoService,
    private renderer: Renderer2
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
    
    this.pricecheckInDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
    this.pricecheckOutDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);
    this.dayDiff = (this.pricecheckOutDate.getTime() - this.pricecheckInDate.getTime()) / (1000 * 60 * 60 * 24);

    this.id = this.router.url.split('/');
    this.isLoading$.next(true);

    this.http
      .get(`${this.appUrl}/rooms/${this.id[this.id.length - 1]}/`)
      .subscribe(
        (res: RoomDetail) => {
          this.price = res.price;
          this.reservationInfoService.reservationInfoObj.price = res.price;
          this.min_stay = res.min_stay;
          this.max_stay = res.max_stay;
          this.totalPriceBeforeTex = this.price;
          this.serviceFee = this.totalPriceBeforeTex * 0.1;
          this.accommodationsTax = this.serviceFee * 0.1;
          this.totalPriceAfterTex =
            this.totalPriceBeforeTex +
            this.cleaningExpenses +
            this.serviceFee +
            this.accommodationsTax;
          this.total_rating = res.total_rating;
          this.image = res.image;
          this.image_1 = res.image_1;
          this.image_2 = res.image_2;
          this.image_3 = res.image_3;
          this.image_4 = res.image_4;
          this.capacity = res.capacity;
          res.reservations.forEach(element => {
          this.getDateRange(element[0], element[1], this.listDate);
          });
          this.setDisableDate();
          this.posibleMaxMin();
          this.checkDate();
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

  posibleMaxMin() {
    const cInDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
    const cOutDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);
    const diff = (cOutDate.getTime() - cInDate.getTime()) / (1000 * 60 * 60 * 24);
    this.dayDiff = diff;
    if (diff < this.min_stay) {
      this.overMinstay = true;
      this.overMaxstay = false;
      this.btnOpacity = '0.1';
      this.blockSend = true;
    } else if (diff > this.min_stay && diff <= this.max_stay) {
      this.overMinstay = false;
      this.overMaxstay = false;
      this.btnOpacity = '1';
      this.blockSend = false;
    } else if (diff > this.max_stay) {
      this.overMinstay = false;
      this.overMaxstay = true;
      this.btnOpacity = '0.1';
      this.blockSend = true;
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
    this.checkDate();
    this.posibleMaxMin();
    this.setPrice();
  }

  onValueChange2(value: any): void {
    this.endDate2 = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
    this.reservationInfoService.reservationInfoObj.checkOut = this.endDate2;
    this.checkDate();
    this.posibleMaxMin();
    this.setPrice();
  }

  checkDate() {
    const sDate = new Date(this.reservationInfoService.reservationInfoObj.checkIn);
    const eDate = new Date(this.reservationInfoService.reservationInfoObj.checkOut);
    const diff = (eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24);
    this.dayDiff = diff;
    if (diff <= 0) {
      this.compareDate = true;
      this.btnOpacity = '0.1';
      this.blockSend = true;
    } else {
      this.compareDate = false;
      this.btnOpacity = '1';
      this.blockSend = false;
    }
  }

  setDisableDate() {
    this.listDate.forEach(element => {
      this.disabledDates.push(new Date(element));
    });
  }

  increase(personnelType: HTMLSpanElement) {
    if (
      this.capacity > this.reservationInfoService.reservationInfoObj.personnel
    ) {
      this.reservationInfoService.reservationInfoObj[personnelType.id]++;

      this.reservationInfoService.reservationInfoObj.personnel++;
    }
    this.checkPersonnel();
    this.checkInfants();
  }

  decrease(personnelType: HTMLSpanElement) {
    if (
      personnelType.id === 'adults' &&
      this.reservationInfoService.reservationInfoObj[personnelType.id] === 1
    ) {
    } else {
      if (
        this.reservationInfoService.reservationInfoObj[personnelType.id] > 0
      ) {
        this.reservationInfoService.reservationInfoObj[personnelType.id]--;

        this.reservationInfoService.reservationInfoObj.personnel--;
      }
    }
    this.checkPersonnel();
    this.checkInfants();
  }

  checkPersonnel() {
    if ( this.capacity <= this.personnel ) {
      this.increaseBtn1 = true;
      this.increaseBtn2 = true;
      this.styleIncreasebtn1 = 0.1;
      this.styleIncreasebtn2 = 0.1;
    } else {
      this.increaseBtn1 = false;
      this.increaseBtn2 = false;
      this.styleIncreasebtn1 = 1;
      this.styleIncreasebtn2 = 1;
    }
  }

  checkInfants() {
    if (this.infants >= 5) {
      this.increaseBtn3 = true;
      this.styleIncreasebtn3 = 0.1;
    } else {
      this.increaseBtn3 = false;
      this.styleIncreasebtn3 = 1;
    }
  }

  get adultsFromService() {
    return this.reservationInfoService.reservationInfoObj.adults;
  }

  get childrenFromService() {
    return this.reservationInfoService.reservationInfoObj.children;
  }

  get infantsFromService() {
    return this.reservationInfoService.reservationInfoObj.infants;
  }

  get personnelFromService() {
    return this.reservationInfoService.reservationInfoObj.personnel;
  }
}
