import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageList } from 'src/app/core/interface/messageList.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  appUrl: string = environment.appUrl;

  constructor(private router: Router, private http: HttpClient) {}
  messageList = [];

  ngOnInit() {
    this.isLoading$.next(true);
    this.http.get(`${this.appUrl}/chat/`).subscribe(
      (res: Array<MessageList>) => {
        for (const message of res) {
          this.messageList.push(message);
        }
      },
      err => {},
      () => {
        this.isLoading$.next(false);
      }
    );
  }

  toMessage(id: number) {
    localStorage.setItem('messageId', id.toString());
    this.router.navigate([`message/${id}`]);
  }
}
