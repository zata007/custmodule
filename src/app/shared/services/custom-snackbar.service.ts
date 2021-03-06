import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class CustomSnackbarService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public open(message, action = 'success', duration = 50000) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration });
    });
  }
}
