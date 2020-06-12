import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SocketIOService} from './services/socketio.service';

export interface SmsEntity {
  id: number;
  from: string;
  body: string;
  to: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['from', 'to', 'message'];

  dataSource = new MatTableDataSource<SmsEntity>([]);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    protected readonly http: HttpClient,
    protected readonly socketService: SocketIOService
  ) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.dataSource.paginator = this.paginator;

    this.getSms()
      .subscribe(data => {
        this.dataSource.data = data;
      }, (err: HttpErrorResponse) => {
        console.error({err});
      });

    this.socketService.sub<SmsEntity>('sms', more => {
      if (this.dataSource.data) {
        this.dataSource.data.push(more);
      }
    });
  }

  getSms(page = 0, size = 10): Observable<SmsEntity[]> {
    const url = `/api/sms?page=${page}&size=${size}`;
    return this.http.get<SmsEntity[]>(url);
  }
}
