import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  modalRef: BsModalRef;
  Allcounter = 0;
  Adultcounter = 0;
  Childcounter = 0;
  Youngcounter = 0;
  appUrl: string = environment.appUrl;

  config = {
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService, private http: HttpClient, ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  roomlistopenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  

  ngOnInit() {
    this.http.get(`${this.appUrl}/rooms/1`)
      .subscribe(res => console.log(res))

  }
  increase(n: number) {
    // console.log(n)
    if(n === 1){
      this.Adultcounter++;
    } else if (n== 2) {
      this.Childcounter++;
    } else if (n==3) {
      this.Youngcounter++;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
  }

  decrease(n : number) {
    if(n==1){
      if (this.Adultcounter === 0) { return; }
      this.Adultcounter--;
    } else if (n==2) {
      if (this.Childcounter === 0) { return; }
      this.Childcounter--;
    } else if (n==3) {
      if (this.Youngcounter === 0) { return; }
      this.Youngcounter--;
    }
    this.Allcounter = this.Adultcounter + this.Childcounter + this.Youngcounter;
  }
}
