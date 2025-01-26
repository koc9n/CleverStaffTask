import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private apiUrl = 'https://api.ipgeolocation.io/timezone';
  private ipApiUrl = 'https://api.ipgeolocation.io/ipgeo';
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTimeByTimezone(timezone: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?apiKey=${this.apiKey}&tz=${timezone}`);
  }

  getTimezoneByIP(): Observable<any> {
    return this.http.get<any>(`${this.ipApiUrl}?apiKey=${this.apiKey}`);
  }
}
