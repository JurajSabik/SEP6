import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomainUser, UserRole} from "../../model/domain/domain-user";
import {UserService} from "../../services/user.service";
import {UserHelperService} from "../../services/helpers/user-helper.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteDialogComponent} from "../confirm-delete-dialog-component/confirm-delete-dialog.component";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId: string | null | undefined;
  userProfile: DomainUser | undefined;
  isCurrentUser: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private userHelperService: UserHelperService,
              private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.userProfile = await new Promise<DomainUser | undefined>((resolve) => {
      this.route.paramMap.subscribe((params) => {
        this.userId = params.get('userId');
        if (this.userId) {
          this.userService.getUserById(this.userId).subscribe((user) => {
            resolve(user);
          });
        }
      });
    });
    const domainUser = await this.userHelperService.fetchDomainUser();
    if (this.userProfile?.userId === domainUser.userId) {
      this.isCurrentUser = true;
    }
  }

  protected readonly UserRole = UserRole;
   async openDeleteAccountDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { text: `Are you sure you want to delete your account with username: ${this.userProfile?.username}`},
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.deleteAccount();
      }
    });
  }

  async deleteAccount() {
    this.userService.deleteUser(this.userProfile?.userId as string).subscribe();
    await this.authService.getCurrentUser()?.reload();
    await this.authService.getCurrentUser()?.delete();
    await this.authService.signOut();
    await this.router.navigate(["/home"]);
  }

  async goToUserList() {
     await this.router.navigate([`/favorite-item-list/${this.userProfile?.userId}`]);
  }
}
