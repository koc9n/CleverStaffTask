import { Injectable } from '@angular/core';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class TimeSyncService {
  private currentTime = moment();

  startTimer(): void {
    setInterval(() => {
      this.currentTime = moment();
    }, 1000);
  }

  getCurrentTime() {
    return this.currentTime;
  }
}
