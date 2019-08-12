import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuOpen: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;

  constructor() {}

  menuChangeDetect() {
    this.isOpen = !this.isOpen;
    this.menuOpen.emit(this.isOpen);
  }
}
