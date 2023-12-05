import {Component, OnInit} from '@angular/core';
import {TmdbService} from '../../services/tmdb.service';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {UserHelperService} from "../../services/helpers/user-helper.service";

@Component({
  selector: 'app-navbar-middle',
  templateUrl: './navbar-middle.component.html',
  styleUrls: ['./navbar-middle.component.css']
})
export class NavbarMiddleComponent implements OnInit {
  genres: any[] = [];
  selectedMediaType: string = 'movie';
  currentUserId: string = ''
  constructor(private tmdbService: TmdbService, private router: Router, private userHelperService: UserHelperService) {
    // Listen to changes in the route to dynamically set the selected media type
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setMediaTypeFromRoute();
    });
  }

  async ngOnInit(): Promise<void> {
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
  async goToFavoriteLists () {
    this.currentUserId = (await this.userHelperService.fetchDomainUser()).userId as string
    await this.router.navigate([`/favorite-item-list/${this.currentUserId}`])
  }
}
