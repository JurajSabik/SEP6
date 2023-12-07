import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TmdbService} from '@services/tmdb.service';
import {filter, switchMap} from "rxjs/operators";
import {DomainReview} from "@models/domain/domain-review";
import {UserHelperService} from "@services/helpers/user-helper.service";
import {DomainUser} from "@models/domain/domain-user";
import {BehaviorSubject} from "rxjs";
import {ReviewService} from "@services/review.service";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number | null = null;
  movie: any = null;
  actors: any[] = [];
  director: any[] = [];
  backgroundImageUrl: string | null = null;
  selectedMediaType: string = 'movie';
  relatedMovies: any[] = [];
  isLoading: boolean = false;
  showReviewPopup?: boolean | false;
  currentUser: DomainUser | undefined;
  private reviews = new BehaviorSubject<DomainReview[]>([]);
  reviewList = this.reviews.asObservable();

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private userHelperService: UserHelperService,
    private reviewService: ReviewService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => this.route.params)
    ).subscribe(params => {
      this.movieId = +params['id'];
      this.setMediaTypeFromRoute();
      this.loadMovieDetails();
    });
  }

  ngOnInit(): void {
    this.setMediaTypeFromRoute();
    const id = this.route.snapshot.paramMap.get('id');
    this.movieId = id ? +id : null;
    this.userHelperService.fetchDomainUser().then((domainUser) => {
      this.currentUser = domainUser;
    })

    this.refreshReviews(id as string);
    if (this.movieId) {
      this.loadMovieDetails();
    }
    this.initScrollEvent();
  }

  private refreshReviews(id: string | undefined) {
    this.reviewService.getReviewsByMovieId(id as string).subscribe({
      next: reviews => {
        this.reviews.next(reviews);
      }
    })
  }

  setMediaTypeFromRoute(): void {
    const path = this.router.url.split('?')[0];
    this.selectedMediaType = path.includes('/tv') ? 'tv' : 'movie';
  }

  loadMovieDetails(): void {
    this.isLoading = true;
    window.scrollTo(0, 0);
    this.tmdbService.getDetails(this.selectedMediaType, this.movieId as number).subscribe(
      (data: any) => {
        this.movie = data;
        this.backgroundImageUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
        console.log(this.backgroundImageUrl)
        this.fetchMovieCast();
        this.fetchRelatedMovies();
      },
      (error: any) => {
        console.error('There was an error fetching the movie details!', error);
        this.isLoading = false;
      }
    );
  }

  fetchMovieCast(): void {
    this.tmdbService.getCast(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      (data: { crew: any[]; cast: any[]; }) => {
        this.director = data.crew.filter((member: any) => member.job === 'Director');
        this.actors = data.cast.slice(0, 8);
      },
      (error: any) => {
        console.error('There was an error fetching the movie cast!', error);
      }
    );
  }

  fetchRelatedMovies(): void {
    this.tmdbService.getRelatedMovies(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      (data: { results: any[]; }) => {
        this.relatedMovies = data.results.slice(0, 16);
        this.isLoading = false;  // Set loading to false after all data is fetched
      },
      (error: any) => {
        console.error('There was an error fetching related movies!', error);
        this.isLoading = false;
      }
    );
  }
  openReviewPopup(): void {
    this.showReviewPopup = true;
    console.log('Review Popup Opened', this.showReviewPopup);
  }

  closeReviewPopup(): void {
    this.showReviewPopup = false;
    console.log('Review Popup Closed', this.showReviewPopup);
  }

  handleReviewSubmit(): void {
    this.refreshReviews(this.movieId?.toString())
    this.closeReviewPopup();
  }

  initScrollEvent(): void {
    this.renderer.listen('window', 'scroll', () => {
      const btn = document.querySelector('.btn-review') as HTMLElement;
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 100) {
        btn.classList.add('fixed-top');
      } else {
        btn.classList.remove('fixed-top');
      }
    });
  }
}
