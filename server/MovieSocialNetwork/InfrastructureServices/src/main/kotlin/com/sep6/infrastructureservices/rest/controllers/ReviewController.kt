package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.ReviewPersistenceService
import io.github.oshai.kotlinlogging.KotlinLogging
import models.Review
import models.Vote
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import services.ReviewService

@RestController
@CrossOrigin(origins = ["http://localhost:4200",  "http://localhost:42185/", "http://20.105.24.162"], allowCredentials = "true")
@RequestMapping("api/reviews")
class ReviewController(private val reviewRepo: ReviewPersistenceService) {
  private val reviewService: ReviewService = ReviewService(reviewRepo)

  @GetMapping("/{reviewId}")
  suspend fun getReviewById(@PathVariable reviewId: UUID): ResponseEntity<Review> {
    val review = reviewRepo.getReviewById(reviewId)
    return ResponseEntity.ok(review)
  }

  @GetMapping("/movie/{movieId}")
  suspend fun getReviewsByMovieId(@PathVariable movieId: String): ResponseEntity<List<Review>> {
    return ResponseEntity(reviewRepo.getReviewsByMovieId(movieId), HttpStatus.OK)
  }

  @GetMapping("/movie/rating/{movieId}")
  suspend fun getRatingForMovie(@PathVariable movieId: String): ResponseEntity<Double> {
    return ResponseEntity(reviewRepo.getRatingForMovie(movieId), HttpStatus.OK)
  }

    @GetMapping("/user/{userId}")
  suspend fun getReviewsByUserId(@PathVariable userId: UUID): ResponseEntity<List<Review>> {
    return ResponseEntity(reviewRepo.getReviewsByUserId(userId), HttpStatus.OK)
  }

  @PostMapping()
  suspend fun createReview(@RequestBody review: Review): ResponseEntity<Review> {
    val createdReview = reviewService.createReview(review)
    return ResponseEntity(createdReview, HttpStatus.CREATED)
  }

  @PutMapping()
  suspend fun updateReview(@RequestBody review: Review): ResponseEntity<String> {
    reviewService.updateReview(review)
    return ResponseEntity.ok().build()
  }

  @DeleteMapping("/{reviewId}")
  suspend fun deleteReview(@PathVariable reviewId: UUID): ResponseEntity<Void> {
    reviewRepo.deleteReview(reviewId)
    return ResponseEntity.ok().build()
  }

  @PutMapping("upvote/{reviewId}/{userId}")
  suspend fun upvoteReview(@PathVariable reviewId: UUID, @PathVariable userId: UUID): ResponseEntity<Void> {
    reviewRepo.upVoteReview(reviewId, userId)
    return ResponseEntity.ok().build()
  }
  @PutMapping("downvote/{reviewId}/{userId}")
  suspend fun downvoteReview(@PathVariable reviewId: UUID, @PathVariable userId: UUID): ResponseEntity<Void> {
    reviewRepo.downVoteReview(reviewId, userId)
    return ResponseEntity.ok().build()
  }

  @DeleteMapping("upvote/delete/{reviewId}/{userId}")
   fun deleteVote(@PathVariable reviewId: UUID, @PathVariable userId: UUID): ResponseEntity<Void> {
    reviewRepo.deleteVote(reviewId, userId)
    return ResponseEntity.ok().build()
  }

  @GetMapping("/votes/review/{reviewId}")
  suspend fun getVotesByReviewId(@PathVariable reviewId: UUID): ResponseEntity<List<Vote>> {
    return  ResponseEntity(reviewRepo.getVotesByReviewId(reviewId), HttpStatus.OK)
  }

  @GetMapping("/votes/user/{userId}")
  suspend fun getVotesByUserId(@PathVariable userId: UUID): ResponseEntity<List<Vote>> {
    return  ResponseEntity(reviewRepo.getVotesByUserId(userId), HttpStatus.OK)
  }
}