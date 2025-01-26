import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimezoneService } from '../../services/timezone.service';
import { TimezoneCommunicationService } from '../../services/timezone-communication.service';
import moment from 'moment-timezone';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clock-table',
  templateUrl: './clock-table.component.html',
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  styleUrls: ['./clock-table.component.css']
})
export class ClockTableComponent implements OnInit, OnDestroy {
  private timezonesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private updateTimeIntervalId: any;
  timezones$: Observable<any[]> = this.timezonesSubject.asObservable();
  displayedColumns: string[] = ['name', 'abbreviation', 'time', 'date', 'daylightSaving'];


  constructor(private timezoneService: TimezoneService,
              private timezoneCommunicationService: TimezoneCommunicationService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadDefaultTimezone();
    this.updateTimeIntervalId = setInterval(() => this.updateTimes, 1000); // Refresh every second

    this.timezoneCommunicationService.addTimezone$.subscribe(timezone => {
      this.addTimezone(timezone);
    });
  }

  loadDefaultTimezone(): void {
    this.timezoneService.getTimezoneByIP().subscribe({
      next: (data) => {
        const userTimezone = data.time_zone.name;
        this.timezoneCommunicationService.addTimezone(userTimezone);
      },
      error: (err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {message: 'Failed to load timezone by IP.'}
        });
        clearInterval(this.updateTimeIntervalId);
      }
    });
  }

  addTimezone(timezone: string): void {
    function generateDateRangeString(data: any) {
      return `☑ ${data.dst_start.dateTimeBefore.split('T')[0]} -> ${data.dst_end.dateTimeBefore.split('T')[0]}`;
    }

    if (this.timezonesSubject.getValue().some(tz => tz.name === timezone)) {
      this.dialog.open(ErrorDialogComponent, {
        data: {message: 'The timezone is already added.'}
      });
    } else {
      this.timezoneService.getTimeByTimezone(timezone).subscribe({
        next: (data) => {
          const timeZoneMoment = moment().tz(data.timezone);
          const newTimezone = {
            name: data.timezone,
            abbreviation: timeZoneMoment.format('z'),
            offset: timeZoneMoment.format('Z'),
            time: timeZoneMoment.format('HH:mm:ss'),
            date: timeZoneMoment.format('DD-MM-YYYY'),
            daylightSaving: timeZoneMoment.isDST() ? generateDateRangeString(data) : '✖'
          };
          this.timezonesSubject.next([...this.timezonesSubject.getValue(), newTimezone]);
        },
        error: (err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {message: 'Failed to load time by timezone.'}
          });
          clearInterval(this.updateTimeIntervalId);
        }
      });
    }
  }

  updateTimes(): void {
    const updatedTimezones = this.timezonesSubject.getValue().map(tz => ({
      ...tz,
      time: moment().tz(tz.name).format('HH:mm:ss'),
      date: moment().tz(tz.name).format('DD-MM-YYYY')
    }));

    this.timezonesSubject.next(updatedTimezones);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateTimeIntervalId);
  }
}
