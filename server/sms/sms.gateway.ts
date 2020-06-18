import {OnGatewayInit, WebSocketGateway} from '@nestjs/websockets';
import {SmsService} from './sms.service';
import {Server} from 'socket.io';

@WebSocketGateway({path: '/api/socket.io'})
export class SmsGateway implements OnGatewayInit {

  constructor(
    protected readonly smsService: SmsService
  ) {
  }

  afterInit(server: Server): any {
    this.smsService.getNext()
      .subscribe(val => {
        server.emit('sms', val);
      });
  }

}
