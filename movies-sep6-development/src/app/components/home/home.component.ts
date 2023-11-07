// home.component.ts

import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  genres: any[] = [];
  selectedGenre: number | null = null;
  selectedSortBy: string = 'latest';
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.fetchGenres();

  }

  fetchGenres(): void {
    this.tmdbService.getGenres("movie").subscribe({
       next: data => {
         this.genres = data.genres;
    }
  }
    );
  }
}
