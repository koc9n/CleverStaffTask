import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TimezoneService } from '../../services/timezone.service';
import { TimezoneCommunicationService } from '../../services/timezone-communication.service';
import moment from 'moment-timezone';
import { MatTableModule } from '@angular/material/table';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TickingDateCellComponent } from '../ticking-date-cell/ticking-date-cell.component';
import { TimeSyncService } from '../../services/time-sync.service';

@Component({
  selector: 'app-clock-table',
  templateUrl: './clock-table.component.html',
  imports: [
    MatTableModule,
    TickingDateCellComponent
  ],
  styleUrls: ['./clock-table.component.css']
})
export class ClockTableComponent implements OnInit, OnDestroy {
  timezones: WritableSignal<any[]> = signal([]);
  displayedColumns: string[] = ['name', 'abbreviation', 'time', 'date', 'daylightSaving'];
  timezoneService = inject(TimezoneService);
  timezoneCommunicationService = inject(TimezoneCommunicationService);
  timeSync = inject(TimeSyncService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    const storedTimezones = sessionStorage.getItem('timezones');
    if (storedTimezones && storedTimezones.length > 0) {
      this.timezones.set(JSON.parse(storedTimezones));
    } else {
      this.loadDefaultTimezone();
    }

    this.timezoneCommunicationService.addTimezone$.subscribe((timezone: string) => {
      this.addTimezone(timezone);
    });
  }

  loadDefaultTimezone(): void {
    this.timezoneService.getTimezoneByIP().subscribe({
      next: (data) => {
        const userTimezone = data.time_zone.name;
        this.timezoneCommunicationService.addTimezone(userTimezone);
      },
      error: (_err) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {message: 'Failed to load timezone by IP.'}
        });
      }
    });
  }

  addTimezone(timezone: string): void {
    function generateDateRangeString(data: any) {
      return `☑ ${data.dst_start.dateTimeBefore.split('T')[0]} -> ${data.dst_end.dateTimeBefore.split('T')[0]}`;
    }

    if (this.timezones().some(tz => tz.name === timezone)) {
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
            dateTime: data.date_time,
            daylightSaving: timeZoneMoment.isDST() ? generateDateRangeString(data) : '✖'
          };
          this.timezones.set([...this.timezones(), newTimezone]);
          sessionStorage.setItem('timezones', JSON.stringify(this.timezones()));
          this.timeSync.startTimer();
        },
        error: (_err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: {message: 'Failed to load time by timezone.'}
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    //
  }
}
