import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'a7eba6c159cef4431cfddfaa56861157';
const BASE_URL = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) {}

  getItems(contentType: 'tv' | 'movie' = 'movie', page: number = 1, genre: number | null = null, sortBy: string = 'popular'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString());

    // Append the genre to the parameters if it's not null
    if (genre !== null) {
      params = params.append('with_genres', genre.toString());
    }

    // Map sorting parameter
    const sortOptions = {
      'latest': contentType === 'tv' ? 'first_air_date.desc' : 'release_date.desc',
      'popular': 'popularity.desc',
      'rating': 'vote_average.desc'
    };

    // If sortBy is not one of the predefined keys, default it to 'latest'
    if (!sortOptions.hasOwnProperty(sortBy)) {
      sortBy = 'latest';
    }

    // @ts-ignore
    params = params.append('sort_by', sortOptions[sortBy]);

    // Determine the endpoint based on whether we have a genre filter
    let endpoint = genre !== null
      ? `${BASE_URL}discover/${contentType}?api_key=${API_KEY}`
      : `${BASE_URL}${contentType}/popular?api_key=${API_KEY}`;
    return this.http.get(endpoint, { params });
  }

  // A generic method for getting item details, either a movie or a series
  getDetails(contentType: string, id: number): Observable<any> {
    return this.http.get(`${BASE_URL}${contentType}/${id}?api_key=${API_KEY}`);
  }

  // A generic method for getting the cast, either for movies or series
  getCast(contentType: 'tv' | 'movie', id: number): Observable<any> {
    return this.http.get(`${BASE_URL}${contentType}/${id}/credits?api_key=${API_KEY}`);
  }

  // A generic method for getting genres, either for movies or series
  getGenres(contentType: 'tv' | 'movie'): Observable<any> {
    return this.http.get(`${BASE_URL}genre/${contentType}/list?api_key=${API_KEY}`);
  }

  getRelatedMovies(contentType: 'tv' | 'movie', id: number): Observable<any> {
    return this.http.get(`${BASE_URL}${contentType}/${id}/similar?api_key=${API_KEY}`);
  }

  search(query: string, type: 'movie' | 'tv' | 'person' = 'movie'): Observable<any> {
    let params = new HttpParams().set('query', query);
    return this.http.get(`${BASE_URL}search/${type}?api_key=${API_KEY}`, { params });
  }
}
