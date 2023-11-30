import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-follower-dialog',
  templateUrl: './add-follower-dialog.component.html',
  styleUrls: ['./add-follower-dialog.component.css'],
})
export class AddFollowerDialogComponent {
  username: string = '';

  constructor(public dialogRef: MatDialogRef<AddFollowerDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

