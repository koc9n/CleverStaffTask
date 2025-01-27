import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  readonly apiUrl = 'https://api.ipgeolocation.io/timezone';
  readonly ipApiUrl = 'https://api.ipgeolocation.io/ipgeo';
  readonly apiKey = environment.apiKey;
  http = inject(HttpClient)

  getTimeByTimezone(timezone: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?apiKey=${this.apiKey}&tz=${timezone}`);
  }

  getTimezoneByIP(): Observable<any> {
    return this.http.get<any>(`${this.ipApiUrl}?apiKey=${this.apiKey}`);
  }
}
