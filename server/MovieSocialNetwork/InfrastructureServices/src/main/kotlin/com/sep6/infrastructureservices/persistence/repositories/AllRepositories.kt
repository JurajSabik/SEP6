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
interface FavoriteListPersistenceRepository : CrudRepository<FavoriteListEntity, UUID>
interface ReviewPersistenceRepository : JpaRepository<ReviewEntity, UUID>
interface ReplyPersistenceRepository : JpaRepository<ReplyEntity, UUID>
interface CommentPersistenceRepository : CrudRepository<CommentEntity, UUID>