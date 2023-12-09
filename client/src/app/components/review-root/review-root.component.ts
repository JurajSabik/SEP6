import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserHelperService} from "@services/helpers/user-helper.service";
import {ReviewService} from "@services/review.service";
import {DomainReview} from "@models/domain/domain-review";
import {Vote} from "@models/domain/vote-dto";
import {DomainUser} from "@models/domain/domain-user";
import {UserService} from "@services/user.service";
import {TmdbService} from "@services/tmdb.service";
import {DomainComment} from "@models/domain/domain-comment";
import {CommentService} from "@services/comment.service";
import {SnackbarService} from "@services/snackbar.service";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-review-root',
  templateUrl: './review-root.component.html',
  styleUrls: ['./review-root.component.css']
})
export class ReviewRootComponent implements OnInit {
  loggedUser: DomainUser | undefined;
  reviewAuthor: DomainUser | undefined;
  reviewId: string | undefined;
  review: DomainReview | undefined;
  votes: Vote[] | undefined;
  private votesSubject = new BehaviorSubject<Vote[]>([]);
  votesList$ = this.votesSubject.asObservable();
  newCommentText: string | undefined;
  movieTitle: string | undefined;
  backgroundImageUrl: string | undefined;
  private commentListSubject = new BehaviorSubject<DomainComment[]>([]);
  commentList$: Observable<DomainComment[]> = this.commentListSubject.asObservable();
  private numberOfUpvotesSubject = new BehaviorSubject<number>(0);
  numberOfUpvotes$: Observable<number> = this.numberOfUpvotesSubject.asObservable();

  private numberOfDownvotesSubject = new BehaviorSubject<number>(0);
  numberOfDownvotes$: Observable<number> = this.numberOfDownvotesSubject.asObservable();

  constructor(
    private userHelperService: UserHelperService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private tmdbService: TmdbService,
    private commentService: CommentService,
    private snackbarService: SnackbarService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.userHelperService.fetchDomainUser();
    this.fetchRouteReviewId();
    this.fetchReview();
  }


  private fetchReview() {
    this.reviewService.getReviewById(this.reviewId!).subscribe((review) => {
      this.review = review;
      this.refreshUser();
      this.refreshCommentList();
      this.refreshVotes();
      this.refreshMovieDetails();
    })
  }

  private fetchRouteReviewId() {
    this.route.paramMap.subscribe((params) => {
      this.reviewId = params.get('reviewId')!;
    });
  }

  private refreshMovieDetails() {
    this.tmdbService.getDetails('movie', this.review!.movieId!).subscribe((movie) => {
      this.movieTitle = movie.title;
      this.backgroundImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    });
  }

  private refreshUser(): void {
    this.userService.getUserById(this.review!.userId!).subscribe((user) => {
      this.reviewAuthor = user;
    });
  }

  private refreshVotes() {
    this.reviewService.getVotesByReviewId(this.reviewId!).subscribe((votes) => {
      this.votesSubject.next(votes);
      this.votes = votes
      const filteredVotes = votes.filter((vote) => vote.isUpvote);
      const filteredVotes2 = votes.filter((vote) => !vote.isUpvote);
      this.numberOfUpvotesSubject.next(filteredVotes.length);
      this.numberOfDownvotesSubject.next(filteredVotes2.length);
    });
  }

  upvote() {
    let alreadyVoted = false;
    let currVote: Vote | undefined ;

    this.votes?.forEach((vote) => {
      if (vote.userId === this.loggedUser?.userId) {
        alreadyVoted = true;
        currVote = vote;
      }
    });

    if (!alreadyVoted || !currVote?.isUpvote) {
      this.reviewService.upvoteReview(this.reviewId, this.loggedUser?.userId).subscribe();
    } else {
      this.reviewService.deleteVote(this.reviewId, this.loggedUser?.userId).subscribe();
    }
    this.refreshVotes();
  }

  downvote(): void {
    this.refreshVotes();
    //check if user already voted
    let alreadyVoted = false;
    let currVote : Vote | undefined;

    this.votes?.forEach((vote) => {
      if (vote.userId === this.loggedUser?.userId) {
        alreadyVoted = true;
        currVote = vote;
      }
    });

    if (!alreadyVoted || currVote?.isUpvote) {
      this.reviewService.downvoteReview(this.reviewId, this.loggedUser?.userId).subscribe();
    } else {
      this.reviewService.deleteVote(this.reviewId, this.loggedUser?.userId).subscribe();
    }
    this.refreshVotes();
  }

  getTimeDelta(): string | undefined {
    if (this.review !== null) {
      //get time delta
      // const delta = new Date().getTime() - new Date(this.review!.timestamp!).getTime();
      // const delta = new Date().getTime() - this.review!.timestamp!.getTime();
      const delta = new Date().getTime() - new Date(this.review!.timestamp!.toString()).getTime();
      const seconds = Math.floor(delta / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      //return time delta
      if (seconds < 5) {
        return "just now";
      } else if (minutes < 1) {
        return seconds + " seconds ago";
      } else if (hours < 1) {
        return minutes + " minutes ago";
      } else if (hours < 24) {
        return hours + " hours ago";
      } else {
        return days + " days ago";
      }
    }
    return undefined;
  }

  getStarList() {
    if (this.review !== null && this.review?.rating) {
      const stars = [];
      for (let i = 0; i < this.review?.rating; i++) {
        stars.push(i);
      }
      return stars;
    }
    return undefined;
  }

  getStarBorderList() {
    if (this.review !== null && this.review?.rating) {
      const stars = [];
      for (let i = 0; i < 5 - this.review.rating; i++) {
        stars.push(i);
      }
      return stars;
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    return this.loggedUser !== undefined;
  }

  isMyReview() {
    return this.loggedUser?.userId === this.review?.userId;
  }

  delete() {
    this.reviewService.deleteReview(this.reviewId!).subscribe();
    this.router.navigate(['/home']).then(r => console.log(r));
  }

  edit() {
    //pop up edit review dialog
    //ToDo ...
  }

  getCommentAuthor(userId: string | undefined): any {
    let commentAuthor: DomainUser | undefined;
    this.userService.getUserById(userId as string).subscribe((user) => {
      commentAuthor = user;
    });
    return commentAuthor;
  }

  refreshCommentList() {
    this.commentService.getCommentsByReviewId(this.reviewId!).subscribe((comments) => {
      this.commentListSubject.next(comments);
    });
  }

  async onSubmit() {
    const comment: DomainComment = {
      userId: this.loggedUser!.userId,
      reviewId: this.reviewId!,
      text: this.newCommentText,
      timestamp: new Date(),
      upvotes: 0,
      downvotes: 0
    };


    this.commentService.createComment(comment).subscribe({
      next: async (comment) => {
        this.snackbarService.open("Comment added.");
        this.refreshCommentList();
      },
      error: () => {
        this.snackbarService.open("Error adding comment.")
      }
    })


  }
}
