package repository_contracts

import models.User
import java.util.*
import kotlin.collections.HashSet

interface UserRepository {
  fun createUser(user: User): User
  fun updateUser(user: User)
  fun deleteUser(userId: UUID)
  fun getUserById(userId: UUID): User?
  fun addFollower(userId: UUID, followerId: UUID)
  fun getFollowers(userId: UUID): List<User>?
  fun getFollowing(userId: UUID): List<User>?
}