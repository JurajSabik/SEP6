package repository_contracts

import models.User
import java.util.*
import kotlin.collections.HashSet

interface UserRepository {
  suspend fun createUser(user: User): User
  suspend fun updateUser(user: User)
  suspend fun deleteUser(userId: UUID)
  suspend fun getUserById(userId: UUID): User?
  suspend fun addFollower(userId: UUID, followerId: UUID)
  suspend fun getFollowers(userId: UUID): List<User>?
  suspend fun getFollowing(userId: UUID): List<User>?
}