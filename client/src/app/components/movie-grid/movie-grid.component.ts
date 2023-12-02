import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent {
  @Input() items: any[] | undefined; // Assuming 'items' is an array of movies
  @Input() contentMode: string | 'movie' | undefined; // Pass this if needed for routing
}
