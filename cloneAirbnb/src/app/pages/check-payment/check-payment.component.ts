import { Component, OnInit } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons/faCreditCard';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faCcAmex } from '@fortawesome/free-brands-svg-icons/faCcAmex';


@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.scss']
})
export class CheckPaymentComponent   {
  faCreditCard = faCreditCard;
  faCcMastercard = faCcMastercard;
  faCcVisa = faCcVisa;
  faCcAmex = faCcAmex;
  toggleCard = false;

  addCard(){
    if (this.toggleCard) {
      this.toggleCard = false;
    }
    else {
      this.toggleCard = true;
    }
  }
}
