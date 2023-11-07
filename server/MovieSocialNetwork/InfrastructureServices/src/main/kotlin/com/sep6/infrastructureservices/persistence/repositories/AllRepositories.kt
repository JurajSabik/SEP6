package com.sep6.infrastructureservices.persistence.repositories

import com.sep6.infrastructureservices.persistence.entities.*
import org.springframework.data.repository.CrudRepository
import java.util.*

interface UserPersistenceRepository : CrudRepository<UserEntity, UUID>
interface FavoriteListPersistenceRepository : CrudRepository<FavoriteListEntity, UUID>
interface ReviewPersistenceRepository : CrudRepository<ReviewEntity, UUID>
interface ReplyPersistenceRepository : CrudRepository<ReplyEntity, UUID>
interface CommentPersistenceRepository : CrudRepository<CommentEntity, UUID>