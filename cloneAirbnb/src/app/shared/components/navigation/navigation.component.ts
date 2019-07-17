import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isMain: boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    this.isMain = this.router.url === '/home' ? true : false;
  }
}
