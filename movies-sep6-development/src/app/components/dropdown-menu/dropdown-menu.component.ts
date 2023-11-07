import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent {
  @Input() userPhoto: string | null = null;
  @Input() userInitials: string = '';

  constructor(public authService: AuthService) {}

  signOut(): void {
    this.authService.signOut();
  }
}
