import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Roomlist } from '../interface/roomlist.interface'

@Injectable({
  providedIn: 'root'
})
export class RoomlistInfoService {

  appUrl: string = environment.appUrl;
  
  constructor(private http: HttpClient) {}

  
}
