import {Injectable} from '@nestjs/common';
import {SmsEntity} from '../domain/sms-entity';
import {Subject} from 'rxjs';

@Injectable()
export class SmsService {

  protected readonly db = new Array<SmsEntity>();
  protected readonly bus = new Subject<SmsEntity>();

  // TODO Pagination
  getList(page: number, size: number) {
    return this.db;
  }

  create(entity: SmsEntity) {
    entity.id = this.db.length + 1;
    this.db.unshift(entity);
    this.bus.next(entity);
    return entity;
  }

  getNext() {
    return this.bus.asObservable();
  }
}
