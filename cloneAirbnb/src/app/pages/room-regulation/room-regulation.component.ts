import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';



@Component({
  selector: 'app-room-regulation',
  templateUrl: './room-regulation.component.html',
  styleUrls: ['./room-regulation.component.scss']
})
export class RoomRegulationComponent implements OnInit {


  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,

  ) {}

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }


}
