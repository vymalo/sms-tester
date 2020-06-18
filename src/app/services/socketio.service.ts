import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import * as io from 'socket.io-client';
import {isPlatformBrowser} from '@angular/common';
import {SmsEntity} from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socket: SocketIOClient.Socket;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: any,
  ) {

  }

  setupSocketConnection() {
    if (isPlatformBrowser(this.platformId)) {
      const host = location.host;
      this.socket = io(host, {
        path: '/api/socket.io',
      });
    }
  }

  sub<T = any>(channel: string, callBack: (data: T) => void) {
    if (this.socket) {
      this.socket.on(channel, callBack);
    }
  }
}
