package repository_contracts

import models.Comment
import java.util.*

interface CommentRepository {
  suspend fun createComment(comment: Comment): Comment
  suspend fun updateComment(comment: Comment)
  suspend fun deleteComment(commentId: UUID)
  suspend fun getCommentById(commentId: UUID): Comment?
  suspend fun getCommentsByReviewId(reviewId: UUID): List<Comment>?
  suspend fun getCommentsByUserId(userId: UUID): List<Comment>?
}