export interface Review {
  reviewId: string;
  userId: string;
  movieId: string;
  text: string;
  rating: number;
  timestamp: string; // Assuming the timestamp will be handled as a string in the client
}

export interface Vote {
  reviewId: string;
  userId: string;
  isUpvote: boolean;
  timestamp: string; // Assuming the timestamp will be handled as a string in the client
}
