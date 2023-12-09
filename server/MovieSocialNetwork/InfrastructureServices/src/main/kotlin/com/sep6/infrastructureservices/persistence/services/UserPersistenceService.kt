package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.AlreadyFollowingException
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import dtos.GeneralUserData
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.persistence.EntityManager
import jakarta.persistence.PersistenceContext
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.User
import models.Vote
import org.springframework.stereotype.Service
import org.springframework.transaction.support.TransactionTemplate
import repository_contracts.UserRepository
import java.util.*


private val logger = KotlinLogging.logger {}

@Service
class UserPersistenceService(
  val jpaUserRepo: UserPersistenceRepository,
  private val transactionTemplate: TransactionTemplate
) : UserRepository {
  @PersistenceContext
  private val entityManager: EntityManager? = null

  override suspend fun createUser(user: User): User = withContext(Dispatchers.IO) {
    val response = jpaUserRepo.save(UserEntity(user))
    return@withContext response.mapToDomain()
  }

  override suspend fun updateUser(user: User): Unit = withContext(Dispatchers.IO) {
    when (jpaUserRepo.existsById(user.userId)) {
      true -> jpaUserRepo.save(UserEntity(user))
      false -> throw ResourceNotFoundException("User with id ${user.userId} not found")
    }
  }

  override suspend fun deleteUser(userId: UUID): Unit = withContext(Dispatchers.IO) {
    when (jpaUserRepo.existsById(userId)) {
      true -> {
        jpaUserRepo.deleteById(userId)
      }

      false -> throw ResourceNotFoundException("User with id $userId not found")
    }
  }

  override fun deleteFollowersAndFollowing(userId: UUID): Unit {
    transactionTemplate.execute {
      entityManager?.createNativeQuery("DELETE FROM user_followers WHERE user_id = :userId OR other_user_id = :userId")
        ?.setParameter("userId", userId)
        ?.executeUpdate()
      it.flush()
    }

  }

  override fun deleteReviewVotes(userId: UUID): Unit {
    transactionTemplate.execute {
      entityManager?.createNativeQuery("DELETE FROM review_voting WHERE user_id = :userId")
        ?.setParameter("userId", userId)
        ?.executeUpdate()
      it.flush()
    }

  }

  override fun deleteReviews(userId: UUID): Unit {
    transactionTemplate.execute {
      entityManager?.createNativeQuery("DELETE FROM reviews WHERE user_id = :userId")
        ?.setParameter("userId", userId)
        ?.executeUpdate()
      it.flush()
    }
  }

  override suspend fun getGeneralUserData(userId: UUID): GeneralUserData {
    val user: UserEntity? = getUser(userId)
    return GeneralUserData(
      user?.followers!!.size,
      user.following!!.size,
      user.reviewList!!.size,
      user.favoriteItemLists!!.size,
      user.commentList!!.size,
      user.replyList!!.size
    )
  }


  override suspend fun getUserById(userId: UUID): User? = withContext(Dispatchers.IO) {
    return@withContext if (jpaUserRepo.existsById(userId)) jpaUserRepo.findById(userId).get()
      .mapToDomain() else throw ResourceNotFoundException("User with id $userId not found")
  }

  override suspend fun addFollower(userId: UUID, otherUserId: UUID): Unit = withContext(Dispatchers.IO) {
    val (user: UserEntity, otherUser: UserEntity) = getUserAndUserToFollow(otherUserId, userId)
    user.following?.forEach { userInList ->
      run {
        if (userInList.userId == otherUserId) {
          throw AlreadyFollowingException("User with id $userId already follows user with id $otherUserId")
        }
      }
    }

    otherUser.let { user.following?.add(it) }
    user.let { otherUser.followers?.add(it) }
    user.let { jpaUserRepo.save(it) }
    otherUser.let { jpaUserRepo.save(it) }
  }

  private fun getUserAndUserToFollow(
    otherUserId: UUID,
    userId: UUID
  ): Pair<UserEntity, UserEntity> {
    lateinit var user: UserEntity
    lateinit var otherUser: UserEntity
    jpaUserRepo.findById(otherUserId)
      .ifPresentOrElse({ otherUser = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return Pair(user, otherUser)
  }

  override suspend fun getFollowers(userId: UUID): List<User>? = withContext(Dispatchers.IO) {
    val user: UserEntity? = getUser(userId)
    return@withContext user?.followers?.map { userEntity -> userEntity.mapToDomain() }
  }

  override suspend fun getFollowing(userId: UUID): List<User>? = withContext(Dispatchers.IO) {
    val user: UserEntity? = getUser(userId)
    return@withContext user?.following?.map { userEntity -> userEntity.mapToDomain() }
  }

  override suspend fun removeFollower(userId: UUID, otherUserId: UUID): Unit = withContext(Dispatchers.IO) {
    val (user: UserEntity, otherUser: UserEntity) = getUserAndUserToFollow(otherUserId, userId)
    user.following?.removeIf { userEntity -> userEntity.userId == otherUser.userId }
    otherUser.followers?.removeIf { userEntity -> userEntity.userId == user.userId }
    user.let { jpaUserRepo.save(it) }
    otherUser.let { jpaUserRepo.save(it) }
  }

  override suspend fun getVotes(userId: UUID): List<Vote>? = withContext(Dispatchers.IO) {
    val user: UserEntity? = getUser(userId)
    return@withContext user?.votes?.map { voteEntity -> voteEntity.mapToDomain() }
  }

  private suspend fun getUser(userId: UUID): UserEntity? = withContext(Dispatchers.IO) {
    var user: UserEntity? = null
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return@withContext user
  }

  override suspend fun doesUserExist(username: String): Boolean = withContext(Dispatchers.IO) {
    return@withContext jpaUserRepo.existsByUsername(username)
  }

  suspend fun doesUserExistByEmail(email: String): Boolean = withContext(Dispatchers.IO) {
    return@withContext jpaUserRepo.existsByEmail(email)
  }

  override suspend fun getUserByExternalId(externalId: String): User = withContext(Dispatchers.IO) {
    if (!jpaUserRepo.existsByExternalId(externalId)) {
      throw ResourceNotFoundException("User with externalId $externalId does not exist server-side.")
    }

    return@withContext jpaUserRepo.findByExternalId(externalId).mapToDomain()
  }

  override suspend fun getUserByUsername(username: String): User = withContext(Dispatchers.IO) {
    if (!jpaUserRepo.existsByUsername(username)) {
      throw ResourceNotFoundException("User with username $username does not exist server-side.")
    }

    return@withContext jpaUserRepo.findByUsername(username).mapToDomain()
  }
}