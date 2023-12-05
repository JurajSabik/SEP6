package services

import dtos.FollowerDto
import models.User
import org.jetbrains.annotations.NotNull
import repository_contracts.UserRepository
import validators.UserValidator
import java.util.*

class UserService(
  @NotNull private val repository: UserRepository,
  private val validator: UserValidator = UserValidator()
) {
  suspend fun createUser(user: User): User {
    validator.validate(user)
    return repository.createUser(user)
  }

  suspend fun updateUser(user: User) {
    validator.validate(user)
    repository.updateUser(user)
  }

  suspend fun followOtherUser(userId: UUID, otherUserId: UUID) {
    repository.addFollower(userId, otherUserId)
  }

  suspend fun getFollowing(userId: UUID): List<FollowerDto> {
    return repository.getFollowing(userId)!!.map { user -> FollowerDto(user.userId, user.username) }
  }

  suspend fun getFollowers(userId: UUID): List<FollowerDto> {
    return repository.getFollowers(userId)!!.map { user -> FollowerDto(user.userId, user.username) }
  }

  suspend fun unfollowOtherUser(userId: UUID, otherUserId: UUID) {
    repository.removeFollower(userId, otherUserId)
  }

  suspend fun deleteUser(userId: UUID) {
    repository.deleteFollowersAndFollowing(userId)
    repository.deleteReviewVotes(userId)
    repository.deleteReviews(userId)
    repository.deleteUser(userId)
  }

  suspend fun doesUserExist(username: String): Boolean {
    return repository.doesUserExist(username)
  }

  suspend fun getUserByExternalId(externalId: String): User {
    return repository.getUserByExternalId(externalId)
  }

  suspend fun getUserByUsername(username: String): User {
    return repository.getUserByUsername(username)
  }
}