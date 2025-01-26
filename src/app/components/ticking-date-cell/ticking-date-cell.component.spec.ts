import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickingDateCellComponent } from './ticking-date-cell.component';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { TimeSyncService } from '../../services/time-sync.service';

describe('TickingDateCellComponent', () => {
  let component: TickingDateCellComponent;
  let fixture: ComponentFixture<TickingDateCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickingDateCellComponent, CustomDatePipe],
      providers: [
        TimeSyncService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TickingDateCellComponent);
    component = fixture.componentInstance;
    component.timezoneName = 'America/New_York';
    component.format = 'yyyy-MM-dd HH:mm:ss';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
