import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlRememberService } from 'src/app/core/service/url-remember.service';

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss']
})
export class StorageListComponent implements OnInit {
<<<<<<< HEAD

  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) { }
=======
  constructor(
    private router: Router,
    private urlRemember: UrlRememberService
  ) {}
>>>>>>> rmorigin/develop

  ngOnInit() {
    this.urlRemember.currentUrl = this.router.url;
  }
}
