import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickingDateCellComponent } from './ticking-date-cell.component';

describe('TickingDateCellComponent', () => {
  let component: TickingDateCellComponent;
  let fixture: ComponentFixture<TickingDateCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickingDateCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TickingDateCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
