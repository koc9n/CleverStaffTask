import { TestBed } from '@angular/core/testing';

import { TimezoneCommunicationService } from './timezone-communication.service';

describe('TimezoneCommunicationService', () => {
  let service: TimezoneCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimezoneCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
