import {Body, Controller, Get, HttpCode, Post, Query} from '@nestjs/common';
import {SmsEntity} from '../domain/sms-entity';
import {SmsService} from './sms.service';

@Controller('sms')
export class SmsController {

  constructor(
    protected readonly smsService: SmsService
  ) {
  }

  @Get()
  getSms(@Query('page') page: number,
         @Query('size') size: number) {
    return this.smsService.getList(page, size);
  }

  @HttpCode(200)
  @Post('send')
  sendSms(@Body() entity: SmsEntity) {
    return this.smsService.create(entity);
  }

}
