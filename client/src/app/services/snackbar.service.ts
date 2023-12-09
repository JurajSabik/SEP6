import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '@components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  open(message: string, duration = 3000): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
