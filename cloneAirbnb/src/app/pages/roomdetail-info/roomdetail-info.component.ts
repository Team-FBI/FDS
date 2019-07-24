import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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
  room_type:any;
  facilities:any;
  dkd : string;


  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;

    this.http.get(`${this.appUrl}/rooms/5/`)
      .subscribe( (res: any) => { 
      this.title = res.title;
      this.address = res.address;
      this.description = res.description;
      this.capacity = res.capacity;
      this.bedroom = res.bedroom;
      this.bathroom = res.bathroom;
      this.room_type = res.room_type;
      if (this.room_type === "Apartment"){
        this.room_type = '아파트';
      // } else if (this.room_type === 2) {
      //   this.room_type = '개인집';
      // } else if (this.room_type === 3) {
      //   this.room_type = '가든하우스';
      // } else if (this.room_type === 4) {
      //   this.room_type = '침대와 아침식사';
      // } else if (this.room_type === 5) {
      //   this.room_type = '빌라';
      // } else if (this.room_type === 6) {
      //   this.room_type = '카라반';
      // } else if (this.room_type === 50) {
      //   this.room_type = '사무실';
      // } else {
      //   this.room_type = '';
      }
      this.facilities = res.facilities;
      // if (this.facilities[0] === "queen-size bed"){
      //   this.facilities = '퀸 사이즈 침대';
      // }
      this.facilities.forEach(element => {
        console.log(element);
        if(element === "queen-size bed"){
          this.dkd = '퀸사이즈침대';
        }
        // if(element === "swimming pool"){
        //   this.dkd += '수영장';
        // }
      })
    })
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


