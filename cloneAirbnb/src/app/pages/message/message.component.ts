import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/core/service/websocket.service';
import { ChatService } from 'src/app/core/service/chat.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [WebsocketService, ChatService]
})
export class MessageComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  appUrl: string = environment.appUrl;
  allInfo = [];
  messages = [];
  messageHistory = [];
  price: number;
  totalPriceBeforeTex: number;
  startDate: string;
  endDate: string;
  cleaningExpenses = 10000;
  serviceFee: number;
  accommodationsTax: number;
  totalPriceAfterTex: number;
  dayDiff: number;
  id = this.chatService.chatRoomId;

  message = {
    message: ''
  };

  constructor(private chatService: ChatService, private http: HttpClient) {
    chatService.messages.subscribe(msg => {
      this.messages.push(msg);
    });
  }

  ngOnInit() {
    this.isLoading$.next(true);
    this.http.get(`${this.appUrl}/chat/${this.id}/`).subscribe(
      (res: any) => {
        this.allInfo.push(res);
        this.price = res.room.price;
        this.startDate = res.start_date;
        this.endDate = res.end_date;
        for (const prvMessage of res.messages) {
          this.messageHistory.push(prvMessage);
        }
        this.dateDiff(
          this.parseDate(this.startDate),
          this.parseDate(this.endDate)
        );
        this.totalPriceBeforeTex = this.price * this.dayDiff;
        this.serviceFee = this.totalPriceBeforeTex * 0.1;
        this.accommodationsTax = this.serviceFee * 0.1;
        this.totalPriceAfterTex =
          this.totalPriceBeforeTex +
          this.cleaningExpenses +
          this.serviceFee +
          this.accommodationsTax;
      },
      err => {},
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  dateDiff(first, second) {
    this.dayDiff = Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  parseDate(str) {
    const mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

  sendMsg(userInput: HTMLInputElement) {
    if (userInput.value.trim()) {
      this.message.message = userInput.value;
      this.chatService.messages.next(this.message);
      userInput.value = '';
    }
  }
}
