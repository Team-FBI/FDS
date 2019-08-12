import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageList } from 'src/app/core/interface/messageList.interface';
import { BehaviorSubject } from 'rxjs';
import { RoomListService } from 'src/app/core/service/room-list.service';
import { MenuService } from 'src/app/core/service/menu.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  appUrl = environment.appUrl;
  menuOpen = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private roomListService: RoomListService,
    private menuService: MenuService
  ) {}
  messageList = [];

  ngOnInit() {
    this.roomListService.roomList = [];
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

    this.menuService.menuOpen.subscribe((booleanValue: boolean) => {
      this.menuOpen = booleanValue;
    });
  }

  parseDate(str) {
    const mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]) > new Date() ? true : false;
  }

  toMessage(id: number) {
    localStorage.setItem('messageId', id.toString());
    this.router.navigate([`message/${id}`]);
  }
}
