import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavbarService} from '../../services/navbar.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isLoggedIn = false;
  userPhoto: string | null = null;
  showMiddleNav = true;
  private searchExpandedSubscription: Subscription | undefined;

  constructor(public authService: AuthService, private navbarService: NavbarService) {
    this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userPhoto = user.photoURL;
      }
      this.searchExpandedSubscription = this.navbarService.searchExpanded$.subscribe(
        isExpanded => {
          this.showMiddleNav = !isExpanded;
        }
      );
    });
  }

  get userInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user) {
      return user.displayName?.split(' ').map(name => name[0].toUpperCase()).join('') || '';
    }
    return '';
  }

  ngOnDestroy(): void {
    if (this.searchExpandedSubscription) {
      this.searchExpandedSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
