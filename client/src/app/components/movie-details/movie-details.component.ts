import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TmdbService} from '../../services/tmdb.service';
import {filter, switchMap} from "rxjs/operators";

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

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
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

    if (this.movieId) {
      this.loadMovieDetails();
    }
  }

  setMediaTypeFromRoute(): void {
    const path = this.router.url.split('?')[0];
    this.selectedMediaType = path.includes('/tv') ? 'tv' : 'movie';
  }

  loadMovieDetails(): void {
    this.isLoading = true;
    window.scrollTo(0, 0);
    this.tmdbService.getDetails(this.selectedMediaType, this.movieId as number).subscribe(
      data => {
        this.movie = data;
        this.backgroundImageUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
        this.fetchMovieCast();
        this.fetchRelatedMovies();
      },
      error => {
        console.error('There was an error fetching the movie details!', error);
        this.isLoading = false;
      }
    );
  }

  fetchMovieCast(): void {
    this.tmdbService.getCast(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      data => {
        this.director = data.crew.filter((member: any) => member.job === 'Director');
        this.actors = data.cast.slice(0, 8);
      },
      error => {
        console.error('There was an error fetching the movie cast!', error);
      }
    );
  }

  fetchRelatedMovies(): void {
    this.tmdbService.getRelatedMovies(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      data => {
        this.relatedMovies = data.results.slice(0, 16);
        this.isLoading = false;  // Set loading to false after all data is fetched
      },
      error => {
        console.error('There was an error fetching related movies!', error);
        this.isLoading = false;
      }
    );
  }
}
