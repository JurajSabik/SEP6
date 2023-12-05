import {Component} from '@angular/core';
import {NavbarService} from '../../services/navbar.service';
import {TmdbService} from '../../services/tmdb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  isExpanded = false;
  searchText = '';

  constructor(private navbarService: NavbarService,
              private tmdbService: TmdbService,
              private router: Router) {
  }

  toggleSearch(): void {
    this.isExpanded = !this.isExpanded;
    this.navbarService.setSearchExpanded(this.isExpanded);
    if (this.isExpanded) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }
  }

  async search(): Promise<void> {
    if (this.searchText) {
      await this.router.navigate(['/results'], {queryParams: {query: this.searchText}});
    }
  }

  clearSearch(): void {
    this.searchText = '';
  }

}

