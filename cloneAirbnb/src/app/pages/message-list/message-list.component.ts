import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageList } from 'src/app/core/interface/messageList.interface';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  appUrl: string = environment.appUrl;

  constructor(private router: Router, private http: HttpClient) {}
  messageList = [];

  ngOnInit() {
    this.http
      .get(`${this.appUrl}/chat/`)
      .subscribe((res: Array<MessageList>) => {
        for (const message of res) {
          this.messageList.push(message);
        }
      });
  }

  toMessage(id: string) {
    this.router.navigate([`message/${id}`]);
  }
}
