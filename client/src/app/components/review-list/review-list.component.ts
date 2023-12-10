import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { Review } from '@models/reviews';
import { DomainUser } from "../../model/domain/domain-user";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId: string | undefined;
  reviews: Review[] = [];
  //get random online avatar
  userPhotoUrl: string = 'https://picsum.photos/200';
  userName: string = 'Anonymous';



  constructor(private reviewService: ReviewService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.movieId) {
      // Hardcoded reviews for design and testing
      this.reviews = [
        {
          reviewId: '1',
          userId: 'user123',
          movieId: this.movieId,
          text: 'Amazing movie, great plot and character development, and a satisfying ending, and the visuals were stunning. A must-watch! an  A+!',
          rating: 5,
          timestamp: '2023-03-01T12:00:00Z',

        },
        {
          reviewId: '2',
          userId: 'user456',
          movieId: this.movieId,
          text: 'Good movie but a bit slow in the middle.',
          rating: 3,
          timestamp: '2023-03-02T15:30:00Z',
        },
        {
          reviewId: '3',
          userId: 'user789',
          movieId: this.movieId,
          text: 'Not what I expected, but still enjoyable.',
          rating: 4,
          timestamp: '2023-03-03T18:45:00Z',
        },
        {
          reviewId: '4',
          userId: 'user101',
          movieId: this.movieId,
          text: 'Visually stunning and emotionally gripping!',
          rating: 5,
          timestamp: '2023-03-04T13:20:00Z',
        },
        {
          reviewId: '5',
          userId: 'user202',
          movieId: this.movieId,
          text: 'A bit overrated, but still a good watch.',
          rating: 3,
          timestamp: '2023-03-05T17:05:00Z',
        },
        {
          reviewId: '6',
          userId: 'user303',
          movieId: this.movieId,
          text: 'Great storyline, but lacked character depth.',
          rating: 4,
          timestamp: '2023-03-06T20:30:00Z',
        },
        {
          reviewId: '7',
          userId: 'user404',
          movieId: this.movieId,
          text: 'An unexpected gem with a powerful message!',
          rating: 5,
          timestamp: '2023-03-07T08:15:00Z',
        }
        // ... any additional reviews
      ];

    }
  }

  getStarType(rating: number, index: number): string {
    return index <= rating ? 'full-star' : 'empty-star';
  }

  getPreviewText(text: string): string {
    const maxLength = 100; // maximum number of characters to display
    return text.length > maxLength ? `${text.substr(0, maxLength)}...` : text;
  }

}
