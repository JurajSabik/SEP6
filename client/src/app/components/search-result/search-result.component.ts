import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  searchResults: any[] | undefined;  // Assuming the results are in an array format
  contentMode: 'tv' | 'movie' = 'movie'; // Default to movies
  searchQuery: string = ''; // Added property for search query


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      if (this.searchQuery) {
        console.log('Searching for:', this.searchQuery);
        this.tmdbService.search(this.searchQuery).subscribe(results => {
          // Assuming the results are in the format you need
          // If the format is different, you may need to process it to fit your needs
          this.searchResults = results.results;  // Adjust based on actual structure of `results`
          console.log('Search results:', this.searchResults);
        }, error => {
          console.error('Error during search:', error);
          // Handle the error appropriately
        });
      }
    });
  }
}
