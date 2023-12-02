package com.sep6.infrastructureservices.rest.controllers

import com.sep6.infrastructureservices.persistence.services.CommentPersistenceService
import models.Comment
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import services.CommentService
import java.util.*

@RestController
@CrossOrigin(origins = ["http://localhost:4200",  "http://localhost:42185/"], allowCredentials = "true")
@RequestMapping("api/comments")
class CommentController(private val commentRepo: CommentPersistenceService) {
    private val commentService: CommentService = CommentService(commentRepo)

    @GetMapping("/{commentId}")
    suspend fun getCommentById(@PathVariable commentId: UUID): ResponseEntity<Comment> {
        val comment = commentRepo.getCommentById(commentId)
        return ResponseEntity.ok(comment)
    }

    @PostMapping()
    suspend fun createComment(@RequestBody comment: Comment): ResponseEntity<Comment> {
        val createdComment = commentService.createComment(comment)
        return ResponseEntity(createdComment, HttpStatus.CREATED)
    }

    @PutMapping()
    suspend fun updateComment(@RequestBody comment: Comment): ResponseEntity<String> {
        commentService.updateComment(comment)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{commentId}")
    suspend fun deleteComment(@PathVariable commentId: UUID): ResponseEntity<Void> {
        commentRepo.deleteComment(commentId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/review/{reviewId}")
    suspend fun getCommentsByReviewId(@PathVariable reviewId: UUID): ResponseEntity<List<Comment>> {
        return ResponseEntity(commentRepo.getCommentsByReviewId(reviewId), HttpStatus.OK)
    }

    @GetMapping("/user/{userId}")
    suspend fun getCommentsByUserId(@PathVariable userId: UUID): ResponseEntity<List<Comment>> {
        return ResponseEntity(commentRepo.getCommentsByUserId(userId), HttpStatus.OK)
    }
}