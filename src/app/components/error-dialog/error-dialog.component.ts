import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>The timezone is already added</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">OK</button>
    </div>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  styles: [`
    h1 {
      font-size: 20px;
    }

    div[mat-dialog-content] {
      margin: 20px 0;
    }

    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ErrorDialogComponent {
  constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
