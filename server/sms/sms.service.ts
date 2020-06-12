import {Injectable} from '@nestjs/common';
import {SmsEntity} from '../domain/sms-entity';
import {Subject} from 'rxjs';

@Injectable()
export class SmsService {

  protected readonly db = new Set<SmsEntity>();
  protected readonly bus = new Subject<SmsEntity>();

  // TODO Pagination
  getList(page: number, size: number) {
    return Array.from(this.db);
  }

  create(entity: SmsEntity) {
    entity.id = this.db.size + 1;
    this.db.add(entity);
    this.bus.next(entity);
    return entity;
  }

  getNext() {
    return this.bus.asObservable();
  }
}
