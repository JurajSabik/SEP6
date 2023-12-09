import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../services/user.service';
import {SnackbarService} from '../../services/snackbar.service';
import {AddFollowerDialogComponent} from './add-follower-dialog/add-follower-dialog.component';
import {DomainUser} from '../../model/domain/domain-user';
import {Follower} from '../../model/domain/follower-dto';
import {UserHelperService} from '../../services/helpers/user-helper.service';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit, OnDestroy {
  followingListSubject = new BehaviorSubject<Follower[]>([]);
  followersListSubject = new BehaviorSubject<Follower[]>([]);
  followingList$: Observable<Follower[]> = this.followingListSubject.asObservable();
  followersList$: Observable<Follower[]> = this.followersListSubject.asObservable();
  currentUser: DomainUser | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  @ViewChild('matTabGroup') matTabGroup: MatTabGroup | undefined;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private userHelperService: UserHelperService,
    private dialog: MatDialog
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userHelperService.fetchDomainUser();
    if (this.currentUser != undefined) {
      this.refreshLists();
      this.matTabGroupSelectedIndexChanged();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  followUser(usernameToFollow: string): void {
    if (usernameToFollow === '') {
      this.snackbarService.open('Username to follow cannot be blank.');
    }

    this.userService.getUserByUsername(usernameToFollow).subscribe({
      next: (user) => {
        if (this.currentUser?.userId != undefined) {
          this.userService.followUser(this.currentUser?.userId as string, user.userId as string).subscribe({
            next: () => {
              this.snackbarService.open(`You are now following ${usernameToFollow}`);
              this.refreshLists();
            },
            error: (err) => {
              if (err.status === 400) {
                this.snackbarService.open('You are already following this user.');
              }
            },
          });
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackbarService.open('User with that username does not exist.');
        }
      },
    });
  }

  openAddFollowerDialog(): void {
    const dialogRef = this.dialog.open(AddFollowerDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.followUser(result.username);
      }
    });
  }

  refreshLists(): void {
    if (this.currentUser != undefined) {
      this.userService.getFollowing(this.currentUser.userId as string).subscribe((followingData) => {
        this.followingListSubject.next(followingData);
      });

      this.userService.getFollowers(this.currentUser.userId as string).subscribe((followersData) => {
        this.followersListSubject.next(followersData);
      });
    }
  }

  private matTabGroupSelectedIndexChanged(): void {
    if (this.matTabGroup !== undefined) {
      this.matTabGroup.selectedIndexChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.refreshLists();
      });
    }
  }

  unfollowUser(userId: string): void {
    this.userService.unfollowUser(this.currentUser?.userId as string, userId).subscribe({
      next: () => {
        this.snackbarService.open(`You have unfollowed the user.`);
        this.refreshLists();
      },
      error: (err) => {
        console.error('Error unfollowing user:', err);
      },
    });
  }
}
