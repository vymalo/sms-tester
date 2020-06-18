import {Module} from '@nestjs/common';
import {AngularUniversalModule} from '@nestjs/ng-universal';
import {join} from 'path';
import {AppServerModule} from '../src/main.server';
import {SmsController} from './sms/sms.controller';
import {SmsService} from './sms/sms.service';
import {SmsGateway} from './sms/sms.gateway';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/sms-sender/browser')
    }),
  ],
  controllers: [
    SmsController
  ],
  providers: [
    SmsService,
    SmsGateway
  ]
})
export class AppModule {
}
