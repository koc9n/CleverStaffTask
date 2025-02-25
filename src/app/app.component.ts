import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTimezoneDialogComponent } from './components/add-timezone-dialog/add-timezone-dialog.component';
import { ClockTableComponent } from './components/clock-table/clock-table.component';
import { TimezoneCommunicationService } from './services/timezone-communication.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    ClockTableComponent,
    MatButton
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dialog = inject(MatDialog);
  timezoneCommunicationService = inject(TimezoneCommunicationService);

  openAddTimezoneDialog(): void {
    const dialogRef = this.dialog.open(AddTimezoneDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timezoneCommunicationService.addTimezone(result);
      }
    });
  }
}
