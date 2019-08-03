import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL =
  'ws://airbnb.tthae.com/ws/chat/48/?token=d584b9535d1dd79c8d132539f9515de4fc713c6e';

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
        console.log(data);
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
