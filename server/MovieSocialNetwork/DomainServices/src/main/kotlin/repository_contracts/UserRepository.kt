package repository_contracts

import models.User
import java.util.*

interface UserRepository {
  suspend fun createUser(user: User): User
  suspend fun updateUser(user: User)
  suspend fun deleteUser(userId: UUID)
  suspend fun getUserById(userId: UUID): User?
  suspend fun addFollower(userId: UUID, otherUserId: UUID)
  suspend fun getFollowers(userId: UUID): List<User>?
  suspend fun getFollowing(userId: UUID): List<User>?
  suspend fun removeFollower(userId: UUID, otherUserId: UUID)
  suspend fun getUserByExternalId(externalId: String): User
  suspend fun getUserByUsername(username: String): User
  suspend fun doesUserExist(username: String): Boolean
}