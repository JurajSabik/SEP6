import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { filter } from "rxjs/operators";

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
  selectedMediaType: string = 'movie'; // Default to 'movies'
  relatedMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setMediaTypeFromRoute();
    });
  }

  ngOnInit(): void {
    this.setMediaTypeFromRoute();
    const id = this.route.snapshot.paramMap.get('id');
    this.movieId = id ? +id : null;
    console.log('Movie ID: ', this.movieId);

    if (this.movieId) {
      this.fetchMovieDetail();
    } else {
      console.error('Movie ID not provided in the route!');
    }
  }

  setMediaTypeFromRoute(): void {
    const path = this.router.url.split('?')[0];
    this.selectedMediaType = path.includes('/tv') ? 'tv' : 'movie';
    console.log('Selected Media Type: ', this.selectedMediaType);
  }

  fetchMovieDetail(): void {
    this.tmdbService.getDetails(this.selectedMediaType, this.movieId as number).subscribe(
      data => {
        this.movie = data;
        this.backgroundImageUrl = 'https://image.tmdb.org/t/p/original' + this.movie.backdrop_path;
        this.fetchMovieCast();
        this.fetchRelatedMovies();
      },
      error => console.error('There was an error fetching the movie details!', error)
    );
  }

// ...

  fetchMovieCast(): void {
    this.tmdbService.getCast(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      data => {
        console.log('Cast: ', data);
        this.director = data.crew.filter((member: any) => member.job === 'Director');
        this.actors = data.cast.slice(0, 8); // Take only the first 10 actors
      },
      error => {
        console.error('There was an error fetching the movie cast!', error);
      }
    );
  }

// ...

  fetchRelatedMovies(): void {
    this.tmdbService.getRelatedMovies(this.selectedMediaType as 'tv' | 'movie', this.movieId as number).subscribe(
      data => {
        this.relatedMovies = data.results.slice(0, 16); // Take only the first 5 related movies
      },
      error => {
        console.error('There was an error fetching related movies!', error);
      }
    );
  }

// You would call fetchRelatedMovies() similarly to fetchMovieCast() in your component logic

}
