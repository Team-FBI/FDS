import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  currentPage = 1;
  
  constructor() { }

  ngOnInit() {
  }

  initializeCurrentPage() {
    this.currentPage = 1;
  }

}
