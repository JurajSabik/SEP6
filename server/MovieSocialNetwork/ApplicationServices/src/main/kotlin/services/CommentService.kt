package services

import models.Comment
import org.jetbrains.annotations.NotNull
import repository_contracts.CommentRepository
import validators.CommentValidator
import java.util.*

class CommentService(
    @NotNull private val repository: CommentRepository,
    private val validator: CommentValidator = CommentValidator()
) {

    suspend fun createComment(comment: Comment): Comment {
        validator.validate(comment)
        return repository.createComment(comment)
    }

    suspend fun updateComment(comment: Comment) {
        validator.validate(comment)
        return repository.updateComment(comment)
    }

    suspend fun deleteComment(commentId: UUID) {
        return repository.deleteComment(commentId)
    }

    suspend fun getCommentById(commentId: UUID): Comment? {
        return repository.getCommentById(commentId)
    }
}