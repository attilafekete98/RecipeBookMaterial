import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSuccess(message: string, action: string, duration): void {
    this.snackBar.open(
      message, action, {
        panelClass: 'snack-bar-success',
        duration
      }
    );
  }

  openError(message: string, action: string, duration): void {
    this.snackBar.open(
      message, action, {
        panelClass: 'snack-bar-error',
        duration
      }
    );
  }
}
