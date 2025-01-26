import { Component, inject, Input } from '@angular/core';
import { TimeSyncService } from '../../services/time-sync.service';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-ticking-date-cell',
  imports: [
    CustomDatePipe
  ],
  templateUrl: './ticking-date-cell.component.html',
  styleUrl: './ticking-date-cell.component.css'
})
export class TickingDateCellComponent {
  @Input() timezoneName: string = '';
  @Input() format: string = '';
  timeSync = inject(TimeSyncService)
}
