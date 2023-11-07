import { Component } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { TmdbService } from '../../services/tmdb.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  isExpanded = false;
  searchText = '';

  constructor(private navbarService: NavbarService, private tmdbService: TmdbService) {
  }

  toggleSearch(): void {
    this.isExpanded = !this.isExpanded;
    this.navbarService.setSearchExpanded(this.isExpanded);
    if (this.isExpanded) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }
  }

  search(): void {
    if (this.searchText) {
      // Call the search method from your service
      this.tmdbService.search(this.searchText).subscribe({
        next: results => {
          // Handle your search results here
          console.log('Search results:', results);
          // Emit the search results using the NavbarService
          this.navbarService.emitSearchResults(results);
          // You could emit an event with the results or assign them to a variable
        },
        error: err => {
          // Handle the error here
          console.error('Error searching:', err);
        }
      });
    }
  }
}
