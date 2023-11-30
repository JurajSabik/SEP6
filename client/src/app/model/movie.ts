export interface Movie {
  id: any;
  poster_path: string;
  title: string;
  backdrop_path?: string;
}

export interface ActorMovies {
  cast: Movie[];
}
