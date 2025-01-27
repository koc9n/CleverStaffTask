import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTableComponent } from './clock-table.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { of, throwError } from 'rxjs';
import { TimezoneService } from '../../services/timezone.service';
import { TimezoneCommunicationService } from '../../services/timezone-communication.service';
import { TimeSyncService } from '../../services/time-sync.service';
import { MatDialog } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatTableModule
} from '@angular/material/table';
import { TickingDateCellComponent } from '../ticking-date-cell/ticking-date-cell.component';

describe('ClockTableComponent', () => {
  let component: ClockTableComponent;
  let fixture: ComponentFixture<ClockTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        ClockTableComponent,
        TickingDateCellComponent],
      providers: [TimezoneService, TimezoneCommunicationService, TimeSyncService, MatDialog, provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClockTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTimezoneByIP on timezoneService and update timezoneCommunicationService', () => {
    const mockTimezone = {time_zone: {name: 'Asia/Kolkata'}};
    const timezoneServiceSpy = spyOn(component['timezoneService'], 'getTimezoneByIP').and.returnValue(of(mockTimezone));
    const timezoneCommSpy = spyOn(component['timezoneCommunicationService'], 'addTimezone');

    component.loadDefaultTimezone();

    expect(timezoneServiceSpy).toHaveBeenCalled();
    expect(timezoneCommSpy).toHaveBeenCalledWith('Asia/Kolkata');
  });

  it('should handle error when getTimezoneByIP fails', () => {
    const timezoneServiceSpy = spyOn(component['timezoneService'], 'getTimezoneByIP').and.returnValue(throwError(() => new Error('Error')));
    const dialogSpy = spyOn(component['dialog'], 'open');

    component.loadDefaultTimezone();

    expect(timezoneServiceSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(ErrorDialogComponent, {data: {message: 'Failed to load timezone by IP.'}});
  });

  it('should add a unique timezone and update timezonesSubject', () => {
    const mockTimezone = {
      timezone: 'America/New_York',
      dst_start: {dateTimeBefore: '2023-03-12T02:00:00'},
      dst_end: {dateTimeBefore: '2023-11-05T02:00:00'}
    };

    const timezonesObserver = spyOn(component['timezones'], 'set');
    spyOn(component['timezoneService'], 'getTimeByTimezone').and.returnValue(of(mockTimezone));

    component.addTimezone('America/New_York');

    expect(timezonesObserver).toHaveBeenCalledWith(jasmine.arrayContaining([jasmine.objectContaining({name: 'America/New_York'})]));
  });

  it('should show an error dialog when adding an existing timezone', () => {
    const dialogSpy = spyOn(component['dialog'], 'open').and.stub();
    const existingTimezone = {name: 'Asia/Kolkata', abbreviation: 'IST', time: '', date: '', daylightSaving: ''};

    component['timezones'].set([existingTimezone]);

    component.addTimezone('Asia/Kolkata');

    expect(dialogSpy).toHaveBeenCalledWith(ErrorDialogComponent, {data: {message: 'The timezone is already added.'}});
  });

  it('should handle error when getTimeByTimezone fails', () => {
    const dialogSpy = spyOn(component['dialog'], 'open').and.stub();
    spyOn(component['timezoneService'], 'getTimeByTimezone').and.returnValue(throwError(() => new Error('Error')));

    component.addTimezone('Invalid/Timezone');

    expect(dialogSpy).toHaveBeenCalledWith(ErrorDialogComponent, {data: {message: 'Failed to load time by timezone.'}});
  });
});
