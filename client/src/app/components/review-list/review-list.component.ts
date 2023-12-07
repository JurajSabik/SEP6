import { Component, OnInit, Input } from '@angular/core';
import {DomainReview} from "@models/domain/domain-review";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() movieId: string | undefined;
  @Input() reviews: DomainReview[] | null | undefined;
  userPhotoUrl: string = 'https://picsum.photos/200';
  userName: string = 'Anonymous';


  constructor() { }

  ngOnInit(): void {
    if (this.movieId) {

    }
  }

  getStarType(rating: number | undefined, index: number): string | undefined{
    return index <= rating! ? 'full-star' : 'empty-star';
  }

  getPreviewText(text: string | undefined): string | undefined{
    const maxLength = 100; // maximum number of characters to display
    return text?.length! > maxLength ? `${text?.substr(0, maxLength)}...` : text;
  }

}
