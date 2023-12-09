import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TmdbService} from '@services/tmdb.service';
import {ActorMovies} from '@models/movie';
//eslint disable
@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent implements OnInit {
  backgroundImageUrl: string | null = null;
  actorId: number | null = null;
  actor: any;
  actorPhotos: any[] = [];
  actorMovies: ActorMovies | null = null;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.backgroundImageUrl = 'assets/images/default-background.jpg';
    this.actorMovies = {cast: []}; // Initialize with a default value
    this.actorId = this.route.snapshot.params['id'];
    this.fetchActorDetails();
    this.fetchActorPhotos();
    this.fetchActorMovies();
  }

  fetchActorDetails(): void {
    this.tmdbService.getActorDetails(this.actorId!).subscribe(data => {
        this.actor = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching actor details', error);
      });
  }

  fetchActorPhotos(): void {
    this.tmdbService.getActorPhotos(this.actorId!).subscribe(data => {
        this.actorPhotos = data.profiles;
      },
      error => {
        console.error('Error fetching actor photos', error);
      });
  }

  fetchActorMovies(): void {
    this.tmdbService.getActorMovies(this.actorId).subscribe(
      data => {
        this.actorMovies = data;
        if (this.actorMovies!.cast.length > 0 && this.actorMovies!.cast[0].backdrop_path) {
          this.backgroundImageUrl = 'https://image.tmdb.org/t/p/original' + this.actorMovies!.cast[0].backdrop_path;
        }
      },
      error => {
        console.error('Error fetching actor movies', error);
      }
    );
  }

  getStarType(popularity: number, starIndex: number): string {
    const scaledPopularity = popularity / 20; // Assuming popularity is out of 100
    const fullStarRating = Math.floor(scaledPopularity);
    if (starIndex <= fullStarRating) {
      return 'fa fa-star'; // Full star class
    } else if (starIndex === fullStarRating + 1 && scaledPopularity % 1 >= 0.5) {
      return 'fa fa-star-half-o'; // Half star class
    } else {
      return 'fa fa-star-o'; // Empty star class
    }
  }


}

