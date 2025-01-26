import { Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
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
  styleUrls: ['./add-timezone-dialog.component.css']
})
export class AddTimezoneDialogComponent implements OnInit {
  timezones: string[] = [];
  selectedTimezone: string = ''

  constructor(
    public dialogRef: MatDialogRef<AddTimezoneDialogComponent>,
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
