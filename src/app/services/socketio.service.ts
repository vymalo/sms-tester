import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import * as io from 'socket.io-client';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  socket;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: any,
  ) {

  }

  setupSocketConnection() {
    if (isPlatformBrowser(this.platformId)) {
      this.socket = io(location.host, {
        path: '/api'
      });
    }
  }

  sub<T = any>(channel: string, callBack: (data: T) => void) {
    if (this.socket) {
      this.socket.on(channel, (data: string) => {
        console.log({data});
        callBack(data as any);
      });
    }
  }
}
