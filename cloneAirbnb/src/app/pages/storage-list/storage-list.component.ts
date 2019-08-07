import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent implements OnInit {
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService,
    private roomListService: RoomListService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.roomListService.roomList = [];
    this.urlRemember.currentUrl = this.router.url;
  }
}
