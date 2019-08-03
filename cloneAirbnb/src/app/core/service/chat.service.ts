import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatRoomId = localStorage.getItem('messageId');
  token = localStorage.getItem('token');

  public messages;

  constructor(wsService: WebsocketService) {
    console.log(this.chatRoomId);
    const CHAT_URL = `ws://airbnb.tthae.com/ws/chat/${this.chatRoomId}/?token=${
      this.token
    }`;
    this.messages = wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent) => {
        const data = JSON.parse(response.data);
        return {
          type: data.type,
          author: data.author,
          is_host: data.is_host,
          text: data.text,
          created: data.created
        };
      });
  }
}
