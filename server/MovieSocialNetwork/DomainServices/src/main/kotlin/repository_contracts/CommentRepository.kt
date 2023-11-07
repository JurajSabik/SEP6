package repository_contracts

import models.Comment
import java.util.*

interface CommentRepository {
  fun createComment(comment: Comment)
  fun updateComment(comment: Comment)
  fun deleteComment(commentId: UUID)
  fun getCommentById(commentId: UUID): Comment?
}