package com.sep6.infrastructureservices.persistence.repositories

import com.sep6.infrastructureservices.persistence.entities.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository

import java.util.*

interface UserPersistenceRepository : JpaRepository<UserEntity, UUID> {
    fun findByExternalId(externalId: String): UserEntity
    fun existsByExternalId(externalId: String): Boolean
    fun existsByUsername(username: String): Boolean
    fun existsByEmail(email: String): Boolean
    fun findByUsername(username: String): UserEntity
}
interface FavoriteListPersistenceRepository : JpaRepository<FavoriteListEntity, UUID> {
    fun findAllByUserUserId(userId: UUID): List<FavoriteListEntity>
    fun existsByUserUserId(userId: UUID):Boolean
}
interface ReplyPersistenceRepository : JpaRepository<ReplyEntity, UUID>
interface ItemRepository : JpaRepository<ItemEntity, UUID> {
    fun findByExternalId(externalId: String): ItemEntity
    fun existsByExternalId(externalId: String):Boolean
}
interface CommentPersistenceRepository : JpaRepository<CommentEntity, UUID> {
    fun findByReview(review: ReviewEntity): List<CommentEntity>
    fun findByUser(user: UserEntity): List<CommentEntity>
}interface ReviewPersistenceRepository : JpaRepository<ReviewEntity, UUID> {
  fun findByMovieId(movieId: String): List<ReviewEntity>
  fun findByUser(user: UserEntity): List<ReviewEntity>
}
interface ReviewVotingPersistenceRepository : CrudRepository<ReviewVoting, ReviewVotingKey>