import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TimezoneService } from './timezone.service';

describe('TimezoneService', () => {
  let service: TimezoneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimezoneService],
    });
    service = TestBed.inject(TimezoneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch time by timezone', () => {
    const sampleResponse = {time: '2023-10-05T10:00:00Z'};
    const timezone = 'America/New_York';

    service.getTimeByTimezone(timezone).subscribe((response) => {
      expect(response).toEqual(sampleResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?apiKey=${service['apiKey']}&tz=${timezone}`);
    expect(req.request.method).toBe('GET');
    req.flush(sampleResponse);
  });

  it('should fetch timezone by IP', () => {
    const sampleResponse = {timezone: 'America/New_York'};

    service.getTimezoneByIP().subscribe((response) => {
      expect(response).toEqual(sampleResponse);
    });

    const req = httpMock.expectOne(`${service['ipApiUrl']}?apiKey=${service['apiKey']}`);
    expect(req.request.method).toBe('GET');
    req.flush(sampleResponse);
  });
});
