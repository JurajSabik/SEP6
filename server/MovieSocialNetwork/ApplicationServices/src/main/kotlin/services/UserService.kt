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
  fun createUser(user: User): User {
    validator.validate(user)
    return repository.createUser(user)
  }

  fun updateUser(user: User) {
    validator.validate(user)
    repository.updateUser(user)
  }

  fun followOtherUser(userId: UUID, followingId: UUID) {
    repository.addFollower(userId, followingId)
  }

  fun getFollowing(userId: UUID): List<FollowerDto> {
    return repository.getFollowing(userId)!!.map { user -> FollowerDto(user.userId, user.username) }
  }

  fun getFollowers(userId: UUID): List<FollowerDto> {
    return repository.getFollowers(userId)!!.map { user -> FollowerDto(user.userId, user.username) }
  }
}