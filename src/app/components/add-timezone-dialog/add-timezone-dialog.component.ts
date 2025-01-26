import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent
} from '@angular/material/dialog';
import { TimezoneService } from '../../services/timezone.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import moment from 'moment-timezone';

@Component({
  selector: 'app-add-timezone-dialog',
  templateUrl: './add-timezone-dialog.component.html',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    NgForOf
  ],
  styleUrls: ['./add-timezone-dialog.component.scss']
})
export class AddTimezoneDialogComponent implements OnInit {
  timezones: string[] = [];
  selectedTimezone: string = ''

  constructor(
    public dialogRef: MatDialogRef<AddTimezoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.timezones = moment.tz.names();
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedTimezone);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
