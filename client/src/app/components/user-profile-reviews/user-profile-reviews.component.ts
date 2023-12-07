import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DomainReview} from "@models/domain/domain-review";
import {ReviewService} from "@services/review.service";
import {UserService} from "@services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TmdbService} from "@services/tmdb.service";

@Component({
  selector: 'app-user-profile-reviews',
  templateUrl: './user-profile-reviews.component.html',
  styleUrls: ['./user-profile-reviews.component.css']
})
export class UserProfileReviewsComponent implements OnInit{
  private userReviewsSubject = new BehaviorSubject<DomainReview[]>([]);
  userReviews$: Observable<DomainReview[]> = this.userReviewsSubject.asObservable();
  userId: string | undefined;
  username: string | undefined;
  constructor(private reviewService: ReviewService,
              private userService: UserService,
              private tmdbService: TmdbService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId') as string;
    });

    this.userService.getUserById(this.userId as string).subscribe({
      next: (user) => {
        this.username = user.username;
      }
    })
    this.reviewService.getReviewsByUserId(this.userId as string).subscribe({
      next: (reviews) => {
        this.userReviewsSubject.next(reviews);
      }
    });


  }

  async goToReview(reviewId: string | undefined) {
    await this.router.navigate([`/review/${reviewId}`])
  }

  protected readonly screen = screen;
}
