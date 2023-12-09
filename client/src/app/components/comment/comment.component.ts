import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomainComment} from "@models/domain/domain-comment";
import {DomainUser} from "@models/domain/domain-user";
import {CommentService} from "@services/comment.service";
import {UserService} from "@services/user.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  @Input() comment: DomainComment | undefined;
  @Input() loggedUser: DomainUser | undefined;
   commentAuthor: string | undefined;
  @Output() removed: EventEmitter<DomainComment> = new EventEmitter<DomainComment>();
  isReplying?: boolean;
  replyText = "";

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}


  isLoggedIn() {
    return this.loggedUser !== undefined;
  }
  isMyComment() {
    return this.comment!.userId === this.loggedUser!.userId;
  }

  delete() {
    this.commentService.deleteComment(this.comment!.commentId!).subscribe();
    this.removed.emit(this.comment);
  }

  edit() {
    this.commentService.updateComment(this.comment!).subscribe();
  }

  reply() {
    this.isReplying = true;
  }

  submitReply() {
    //submit reply
    console.log("submit reply"+this.replyText);
  }

  getTimeDelta(): string {
    const delta = new Date().getTime() - new Date(this.comment!.timestamp!.toString()).getTime();
    const seconds = Math.floor(delta / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    //return time delta
    if (seconds < 5) {
      return "just now";
    }
    else
    if (minutes < 1) {
      return seconds + " seconds ago";
    }
    else
    if (hours < 1) {
      return minutes + " minutes ago";
    }
    else if (hours < 24) {
      return hours + " hours ago";
    }
    else {
      return days + " days ago";
    }
  }

  ngOnInit(): void {
    this.userService.getUserById(this.comment?.userId as string).subscribe({
      next: user => {
        this.commentAuthor = user.username
      }
    })
  }
}
