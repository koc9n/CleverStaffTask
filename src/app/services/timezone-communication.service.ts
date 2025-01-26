// src/app/services/timezone-communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimezoneCommunicationService {
  private addTimezoneSource = new Subject<string>();
  addTimezone$ = this.addTimezoneSource.asObservable();

  addTimezone(timezone: string): void {
    this.addTimezoneSource.next(timezone);
  }
}
