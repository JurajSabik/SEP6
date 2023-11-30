import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: `
    <div class="snackbar-content">
      {{ data.message }}
    </div>
  `,
  styles: [`
    .snackbar-content {
      color: #fff;
      text-align: center;
    }

  `],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
