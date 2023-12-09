import {Component, Input} from '@angular/core';
import {AuthService} from '@services/auth.service';
import {Router} from "@angular/router";
import {SnackbarService} from "@services/snackbar.service";
import {UserHelperService} from "@services/helpers/user-helper.service";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent {
  @Input() userPhoto: string | null = null;
  @Input() userInitials: string = '';

  constructor(public authService: AuthService,
              private userHelperService: UserHelperService,
              private snackbarService: SnackbarService,
              public router: Router) {
  }

  async goToFriends(): Promise<void>{
    await this.router.navigate(['/friends'])
  }

  async goToProfile(): Promise<void>{
    const domainUser = await this.userHelperService.fetchDomainUser()
    await this.router.navigate([`/profile/${domainUser.userId}`])
  }
  async goToDashboard(): Promise<void>{
    const domainUser = await this.userHelperService.fetchDomainUser()
    await this.router.navigate([`/dashboard/${domainUser.userId}`])
  }
  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.snackbarService.open('Signed out')
    await  this.router.navigate(['/home'])
  }
}
