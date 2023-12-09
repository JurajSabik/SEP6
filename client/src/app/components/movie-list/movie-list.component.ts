import {Component, OnInit, HostListener} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TmdbService} from '../../services/tmdb.service';
import {NavbarService} from '../../services/navbar.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  items: any[] = []; // Renamed to items since it can be movies or series
  private currentPage = 1;
  private isLoading = false;
  public contentMode: 'tv' | 'movie' = 'movie'; // Default to movies
  private sortby: 'latest' | 'popular' | 'rating' = 'popular'; // Default sort by popular
  private genreId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private navbarService: NavbarService
  ) {
  }

  ngOnInit(): void {
    // Determine if we are showing movies or series from the route segment
    this.route.url.subscribe(url => {
      if (url && url.length > 0) {
        this.contentMode = url[0].path.includes('tv') ? 'tv' : 'movie';
      } else {
        // Handle the case where url is not as expected
        console.log('URL is not as expected!')
      }
      this.reloadContent();
      // Subscribe to search results
      this.navbarService.searchResults.subscribe(results => {
        console.log('Search results:', results);
        // Handle the search results
        // empty the items array
        this.items = [];
        this.items = results;
      });

    });

    this.route.queryParams.subscribe(params => {
      this.genreId = params['genre'] ? Number(params['genre']) : null;
      this.sortby = params['sortby'] || this.sortby; // Use existing sortby if no new sortby is provided
      this.reloadContent();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading) {
      this.loadMoreItems();
    }
  }

  private reloadContent(): void {
    this.currentPage = 1;
    this.items = []; // Reset items
    this.fetchContent();
  }

  private fetchContent(): void {
    this.isLoading = true;
    this.tmdbService.getItems(this.contentMode, this.currentPage, this.genreId, this.sortby).subscribe(
      data => {
        this.items = [...this.items, ...data.results];
        this.isLoading = false;
      },
      error => {
        console.error(`Error fetching ${this.contentMode} content:`, error);
        this.isLoading = false;
      }
    );
  }

  private loadMoreItems(): void {
    this.currentPage++;
    this.fetchContent();
  }

  getStarType(rating: number, starIndex: number): string {
    const fullStarRating = Math.floor(rating / 2);
    if (starIndex <= fullStarRating) {
      return 'fa fa-star';
    } else if (starIndex === fullStarRating + 1 && rating % 2 >= 0.5) {
      return 'fa fa-star-half-o';
    } else {
      return 'fa fa-star-o';
    }
  }

}
