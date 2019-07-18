import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  counter = 0;
  
  counter3 = 0;

  constructor() {}

  ngOnInit() {}

  increase(n:number){
    this.counter++;
  }

  decrease(){
    if(this.counter > 0){
      this.counter--;
    }
  }

  
}
