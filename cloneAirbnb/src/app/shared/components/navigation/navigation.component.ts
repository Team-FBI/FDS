import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ReservationInfoService } from '../../../core/service/reservation-info.service';
// import { RoomListComponent } from '../../../pages/room-list/room-list.component'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isMain: boolean;
  myPage = false;


  constructor(
    private router: Router, 
    public authService: AuthService,
    public reservationInfoService: ReservationInfoService,
    // private roomListComponent: RoomListComponent
  ) {}

  ngOnInit() {
    this.isMain = this.router.url === '/home' ? true : false;
  }
  showroomList(val) {
    this.reservationInfoService.reservationInfoObj.destination = val;
    
  }

  signOutBtn() {
    this.authService.signOutUser();
  }

}
