import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTimezoneDialogComponent } from './components/add-timezone-dialog/add-timezone-dialog.component';
import { ClockTableComponent } from './components/clock-table/clock-table.component';
import { TimezoneCommunicationService } from './services/timezone-communication.service';
import { MatButton } from '@angular/material/button';
import { TimezoneService } from './services/timezone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatButton,
    ClockTableComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog,
              private timezoneCommunicationService: TimezoneCommunicationService
              ) {}

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
