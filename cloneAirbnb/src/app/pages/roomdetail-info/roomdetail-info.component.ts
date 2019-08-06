import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { DatepickerDateCustomClasses, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-roomdetail-info',
  templateUrl: './roomdetail-info.component.html',
  styleUrls: ['./roomdetail-info.component.scss']
})
export class RoomdetailInfoComponent implements OnInit {
  appUrl: string = environment.appUrl;
  title: string;
  address: string;
  description: string;
  capacity: number;
  bathroom: number;
  bedroom: number;
  room_type: any;
  facilities: any;
  facilitiesArray = [];
  strArray;
  id = this.reservationInfoService.id;
  datePickerConfig:Partial<BsDatepickerConfig>;
  bsInlineValue = this.reservationInfoService.date;
  bsInlineValue2 = new Date();
  minDate: Date;
  maxDate: Date;
  minDate1: number;
  maxDate1: number;
  inputData: Date;
  dateCustomClasses: DatepickerDateCustomClasses[];
  now = new Date();
  fourDaysAhead = new Date();

  // 달력 disable
  disabledDates = [];
  dateMove;
  strDate;
  listDate = [];
  initCheckin = new Date(this.reservationInfoService.checkInDate);
  initCheckOut = new Date(this.reservationInfoService.checkOutDate);



  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService
  ) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-red',
      selectFromOtherMonth: true
    })
    this.minDate = new Date();
    this.maxDate = new Date();
    // this.bsInlineValue2.setDate(this.bsInlineValue.getDate() + 32);
    // 다음달 달력만들때 필요한것
  }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.id = parseInt(localStorage.getItem('roomId'));
    this.bsInlineValue2.setMonth(this.bsInlineValue.getMonth() + 1);
    // console.log(this.bsInlineValue2);

    this.http.get(`${this.appUrl}/rooms/${this.id}/`).subscribe((res: any) => {
      // console.log(res);
      this.title = res.title;
      this.reservationInfoService.reservationInfoObj.title = this.title;
      this.address = res.address;
      this.description = res.description;
      this.strArray = this.description.split('\n');
      this.capacity = res.capacity;
      this.bedroom = res.bedroom;
      this.bathroom = res.bathroom;
      this.room_type = res.room_type;
      this.minDate1 = res.min_stay;
      this.maxDate1 = res.max_stay;
      this.minDate.setDate(this.minDate1);
      this.maxDate.setDate(this.maxDate1);
      // this.fourDaysAhead.setDate(this.now.getDate() + this.maxDate1);
      // this.dateCustomClasses = [
      //   { date: this.now, classes: [] },
      //   { date: this.fourDaysAhead, classes: ['bg-danger', 'text-warning'] }
      // ];

      this.reservationInfoService.reservationInfoObj.roomType = this.room_type;
      if (this.room_type === 'Apartment') {
        this.room_type = '아파트';
      } else if (this.room_type === 'House') {
        this.room_type = '개인집';
      } else if (this.room_type === 'Garden House') {
        this.room_type = '가든하우스';
      } else if (this.room_type === 'Bed and Breakfast') {
        this.room_type = '침대와 아침식사';
      } else if (this.room_type === 'Villa') {
        this.room_type = '빌라';
      } else if (this.room_type === 'Caravan') {
        this.room_type = '카라반';
      } else if (this.room_type === 'Office') {
        this.room_type = '사무실';
      } else {
        this.room_type = '';
      }

      
      res.reservations.forEach(element => {
        this.getDateRange(element[0], element[1], this.listDate);
      });
      this.setDisableDate();
      // this.disabledDates = [];

      this.facilities = res.facilities;
      this.facilities.forEach(element => {
        this.facilitiesArray.push(element);
        if (element[0] === 'queen-size bed') {
          element[0] = '퀸사이즈침대';
        }
        if (element[0] === 'swimming pool') {
          element[0] = '수영장';
        }
        if (element[0] === 'parking lot') {
          element[0] = '주차장';
        }
        if (element[0] === 'ethernet') {
          element[0] = '이더넷';
        }
        if (element[0] === 'work space') {
          element[0] = '작업공간';
        }
        if (element[0] === 'television') {
          element[0] = 'TV';
        }
        if (element[0] === 'kitchen') {
          element[0] = '주방';
        }
        if (element[0] === 'elevator') {
          element[0] = '엘리베이터';
        }
        if (element[0] === 'cloth iron') {
          element[0] = '다리미';
        }
        if (element[0] === 'cloth dryer') {
          element[0] = '옷걸이';
        }
        if (element[0] === 'wifi') {
          element[0] = '와이파이';
        }
        if (element[0] === 'breakfast service') {
          element[0] = '아침식사';
        }
        if (element[0] === 'coffee maker') {
          element[0] = '커피머신';
        }
        if (element[0] === 'air conditioner') {
          element[0] = '에어컨';}});
    });
  }
  onValueChange(value: Date): void {
    this.listDate = [];
    const endDate = value.toISOString().slice(0,10);
    this.getDateRange('2019-07-31', endDate, this.listDate);
    this.setDisableDate();

    // this.inputData = value;
    // console.log(this.inputData);
    // this.bsInlineValue = this.inputData;
    // console.log(this.bsInlineValue);
    // this.now = this.bsInlineValue;
    // console.log(this.now)
    // this.fourDaysAhead.setDate(this.now.getDate() + this.maxDate1);
    // 나중에 서버에 보낼 input data
  }

  getDateRange(startDate, endDate, listDate){
    this.dateMove = new Date(startDate);
    this.strDate = startDate;
    if (startDate === endDate) {
      this.strDate = this.dateMove.toISOString().slice(0,10);
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
  setDisableDate() {
    this.listDate.forEach(element => {
      this.disabledDates.push(new Date(element));
    });
  }
}
