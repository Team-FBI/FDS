import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isMain: boolean;
  myPage= false;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.isMain = this.router.url === '/home' ? true : false;
  }
  showroomList() {
    this.router.navigate(['roomList']);
  }
}
