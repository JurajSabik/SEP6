package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.User
import org.springframework.stereotype.Service
import repository_contracts.UserRepository
import java.util.*

@Service
class UserPersistenceService(val jpaUserRepo: UserPersistenceRepository) : UserRepository {
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
      true -> jpaUserRepo.deleteById(userId)
      false -> throw ResourceNotFoundException("User with id $userId not found")
    }
  }

  override suspend fun getUserById(userId: UUID): User? = withContext(Dispatchers.IO) {
    return@withContext if (jpaUserRepo.existsById(userId)) jpaUserRepo.findById(userId).get()
      .mapToDomain() else throw ResourceNotFoundException("User with id $userId not found")
  }

  override suspend fun addFollower(userId: UUID, followerId: UUID): Unit = withContext(Dispatchers.IO) {
    var user: UserEntity? = null
    var follower: UserEntity? = null
    jpaUserRepo.findById(followerId)
      .ifPresentOrElse({ follower = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    follower?.let { user?.following?.add(it) }
    user?.let { follower?.followers?.add(it) }
    user?.let { jpaUserRepo.save(it) }
    follower?.let { jpaUserRepo.save(it) }
  }

  override suspend fun getFollowers(userId: UUID): List<User>? = withContext(Dispatchers.IO) {
    val user: UserEntity? = getUser(userId)
    return@withContext user?.followers?.map { userEntity -> userEntity.mapToDomain() }
  }

  override suspend fun getFollowing(userId: UUID): List<User>? = withContext(Dispatchers.IO) {
    val user: UserEntity? = getUser(userId)
    return@withContext user?.following?.map { userEntity -> userEntity.mapToDomain() }
  }

  private suspend fun getUser(userId: UUID): UserEntity? = withContext(Dispatchers.IO) {
    var user: UserEntity? = null
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return@withContext user
  }
}