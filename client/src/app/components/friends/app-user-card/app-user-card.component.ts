import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Follower} from "../../../model/domain/follower-dto";

@Component({
  selector: 'app-user-card',
  templateUrl: './app-user-card.component.html',
  styleUrls: ['./app-user-card.component.css'],
})
export class AppUserCardComponent {
  @Input() otherUser: Follower | undefined;
  @Input() isFollowingList: boolean = false;
  @Output() unfollow: EventEmitter<string> = new EventEmitter<string>();


  unfollowUser(event: Event): void {
    event.stopPropagation();
    if (this.otherUser) {
      this.unfollow.emit(this.otherUser.userId);
    }
  }
}
