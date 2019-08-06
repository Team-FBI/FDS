import { Component, OnInit } from '@angular/core';
declare let Kakao: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cloneAirbnb';

  ngOnInit() {
    Kakao.init('71f4d8c641095d4ff1ba79b80a471bf5');
  }
}
