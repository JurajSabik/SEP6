import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-middle',
  templateUrl: './navbar-middle.component.html',
  styleUrls: ['./navbar-middle.component.css']
})
export class NavbarMiddleComponent implements OnInit {
  genres: any[] = [];
  selectedMediaType: string = 'movie'; // Default to 'movies'

  constructor(private tmdbService: TmdbService, private router: Router, private activatedRoute: ActivatedRoute) {
    // Listen to changes in the route to dynamically set the selected media type
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setMediaTypeFromRoute();
    });
  }

  ngOnInit(): void {
    this.setMediaTypeFromRoute();
  }

  setMediaTypeFromRoute() {
    const path = this.router.url.split('?')[0];
    if (path.includes('/tv')) {
      this.selectedMediaType = 'tv';
    } else if (path.includes('/movie')) {
      this.selectedMediaType = 'movie';
    }
    this.fetchGenres();
  }

  fetchGenres(): void {
    this.tmdbService.getGenres(this.selectedMediaType === 'movie' ? 'movie' : 'tv').subscribe({
      next: data => {
        this.genres = data.genres;
      }
    });
  }
}
