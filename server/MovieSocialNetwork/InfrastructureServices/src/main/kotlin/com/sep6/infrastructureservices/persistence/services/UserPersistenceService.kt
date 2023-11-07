package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.UserEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import models.User
import org.springframework.stereotype.Service
import repository_contracts.UserRepository
import java.util.*
import kotlin.collections.HashSet

@Service
class UserPersistenceService(val jpaUserRepo: UserPersistenceRepository) : UserRepository {
  override fun createUser(user: User): User {
    val response = jpaUserRepo.save(UserEntity(user))
    return response.mapToDomain();
  }

  override fun updateUser(user: User) {
    when (jpaUserRepo.existsById(user.userId)) {
      true -> jpaUserRepo.save(UserEntity(user))
      false -> throw ResourceNotFoundException("User with id ${user.userId} not found")
    }
  }

  override fun deleteUser(userId: UUID) {
    when (jpaUserRepo.existsById(userId)) {
      true -> jpaUserRepo.deleteById(userId)
      false -> throw ResourceNotFoundException("User with id $userId not found")
    }
  }

  override fun getUserById(userId: UUID): User? {
    return if (jpaUserRepo.existsById(userId)) jpaUserRepo.findById(userId).get()
      .mapToDomain() else throw ResourceNotFoundException("User with id $userId not found")
  }

  override fun addFollower(userId: UUID, followerId: UUID) {
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

  override fun getFollowers(userId: UUID): List<User>? {
    val user: UserEntity? = getUser(userId)
    return user?.followers?.map { userEntity -> userEntity.mapToDomain() }
  }

  override fun getFollowing(userId: UUID): List<User>? {
    val user: UserEntity? = getUser(userId)
    return user?.following?.map { userEntity -> userEntity.mapToDomain() }
  }

  private fun getUser(userId: UUID): UserEntity? {
    var user: UserEntity? = null
    jpaUserRepo.findById(userId)
      .ifPresentOrElse({ user = it }, { throw ResourceNotFoundException("User with id $userId not found") })
    return user
  }
}