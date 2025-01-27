import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>{{ data.message }}</div>
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
  dialogRef: MatDialogRef<ErrorDialogComponent> = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
