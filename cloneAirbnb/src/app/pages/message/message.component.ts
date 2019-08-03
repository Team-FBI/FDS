import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/core/service/websocket.service';
import { ChatService } from 'src/app/core/service/chat.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  providers: [WebsocketService, ChatService]
})
export class MessageComponent implements OnInit {
  appUrl: string = environment.appUrl;
  messages = [];
  messageHistory = [];
  id = this.chatService.chatRoomId;

  message = {
    message: ''
  };

  constructor(private chatService: ChatService, private http: HttpClient) {
    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
      console.log(msg);
      this.messages.push(msg);
    });
  }

  ngOnInit() {
    this.http.get(`${this.appUrl}/chat/${this.id}/`).subscribe((res: any) => {
      console.log(res);
      for (const prvMessage of res.messages) {
        this.messageHistory.push(prvMessage);
      }
      console.log(this.messageHistory);
    });
  }

  sendMsg(userInput: HTMLInputElement) {
    if (userInput.value.trim()) {
      this.message.message = userInput.value;
      this.chatService.messages.next(this.message);
      userInput.value = '';
    }
  }
}
