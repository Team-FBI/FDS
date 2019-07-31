import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReservationInfoService } from 'src/app/core/service/reservation-info.service';
import { ScrollTopService } from 'src/app/core/service/scroll-top.service';

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
  facility: string;
  strArray;
  id: number;

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient,
    private reservationInfoService: ReservationInfoService,
    private scrollTopService: ScrollTopService
  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
    this.id = this.reservationInfoService.id;

    this.scrollTopService.scrollTop();

    this.http.get(`${this.appUrl}/rooms/${this.id}/`).subscribe((res: any) => {
      this.title = res.title;
      this.address = res.address;
      this.description = res.description;
      // console.log(typeof this.description);
      this.strArray = this.description.split('\n');
      // console.log(this.strArray);
      this.capacity = res.capacity;
      this.bedroom = res.bedroom;
      this.bathroom = res.bathroom;
      this.room_type = res.room_type;
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
      this.facilities = res.facilities;
      this.facilities.forEach(element => {
        if (element === 'queen-size bed') {
          this.facility = '퀸사이즈침대';
        }
        if (element === 'swimming pool') {
          this.facility += '수영장';
        }
        if (element === 'parking lot') {
          this.facility += '주차장';
        }
        if (element === 'ethernet') {
          this.facility += '이더넷';
        }
        if (element === 'work space') {
          this.facility += '작업공간';
        }
        if (element === 'television') {
          this.facility += 'TV';
        }
        if (element === 'kitchen') {
          this.facility += '주방';
        }
        if (element === 'elevator') {
          this.facility += '엘리베이터';
        }
        if (element === 'cloth iron') {
          this.facility += '다리미';
        }
        if (element === 'cloth dryer') {
          this.facility += '옷걸이';
        }
        if (element === 'wifi') {
          this.facility += '와이파이';
        }
        if (element === 'breakfast service') {
          this.facility += '아침식사';
        }
        if (element === 'coffee maker') {
          this.facility += '커피머신';
        }
        if (element === 'air conditioner') {
          this.facility += '에어컨';
        }
      });
    });
  }
}

// a = {size : 침대}

// for (let key in a) {
//   this.facilities.forEach(element => {
//     if(element === key){
//       this.dkd += a[key];
//     }
//   })
// }
