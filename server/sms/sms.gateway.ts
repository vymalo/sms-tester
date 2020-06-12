import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import {SmsService} from './sms.service';

@WebSocketGateway({path: '/api/socket.io'})
export class SmsGateway {

  constructor(
    protected readonly smsService: SmsService
  ) {
  }

  @SubscribeMessage('sms')
  handleMessage() {
    return this.smsService.getNext();
  }
}
