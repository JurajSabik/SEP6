package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.CommentEntity
import com.sep6.infrastructureservices.persistence.entities.ReviewEntity
import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.CommentPersistenceRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.Comment
import org.springframework.stereotype.Service
import repository_contracts.CommentRepository
import java.util.*

@Service
class CommentPersistenceService(val jpaCommentRepo: CommentPersistenceRepository) : CommentRepository {
    override suspend fun createComment(comment: Comment): Comment = withContext(Dispatchers.IO) {
        val response = jpaCommentRepo.save(CommentEntity(comment))
        return@withContext response.mapToDomain()
}

    override suspend fun updateComment(comment: Comment): Unit = withContext(Dispatchers.IO) {
        when(jpaCommentRepo.existsById(comment.commentId)){
            true -> jpaCommentRepo.save(CommentEntity(comment))
            false -> throw ResourceNotFoundException("Comment with id ${comment.commentId} not found")
        }
    }

    override suspend fun deleteComment(commentId: UUID): Unit = withContext(Dispatchers.IO) {
        when(jpaCommentRepo.existsById(commentId)){
            true -> jpaCommentRepo.deleteById(commentId)
            false -> throw ResourceNotFoundException("Comment with id $commentId not found")
        }
    }

    override suspend fun getCommentById(commentId: UUID): Comment? = withContext(Dispatchers.IO) {
        return@withContext if(jpaCommentRepo.existsById(commentId)) jpaCommentRepo.findById(commentId).get()
            .mapToDomain() else throw ResourceNotFoundException("Comment with id $commentId not found")
    }

    override suspend fun getCommentsByReviewId(reviewId: UUID): List<Comment>? = withContext(Dispatchers.IO){
        val comments = jpaCommentRepo.findByReview(ReviewEntity(reviewId))
        return@withContext comments.map { commentEntity -> commentEntity.mapToDomain() }
    }

    override suspend fun getCommentsByUserId(userId: UUID): List<Comment>? = withContext(Dispatchers.IO){
        val comments = jpaCommentRepo.findByUser(UserEntity(userId))
        return@withContext comments.map { commentEntity -> commentEntity.mapToDomain() }

    }
}