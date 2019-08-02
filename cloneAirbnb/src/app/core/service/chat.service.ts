import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL =
  'ws://airbnb.tthae.com/ws/chat/44/?token=b3e432dca9f9379d5d640cfdc29603053a788433';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages;

  constructor(wsService: WebsocketService) {
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
