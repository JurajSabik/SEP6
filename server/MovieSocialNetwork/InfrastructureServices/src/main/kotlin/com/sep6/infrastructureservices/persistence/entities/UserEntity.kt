package com.sep6.infrastructureservices.persistence.entities

import jakarta.annotation.PostConstruct
import jakarta.persistence.*
import java.util.*
import models.User
import models.enums.UserRole
import kotlin.collections.HashSet

@Entity
@NoArgConstructor
@Table(name = "USERS")
class UserEntity(
  @Id
  @Column(name = "userId")
  val userId: UUID,

  @Column(name = "externalId", nullable = true, unique = true)
  val externalId: String?,

  @Column(name = "username", nullable = false, unique = true)
  val username: String,

  @Column(name = "email", nullable = false, unique = true)
  val email: String,

  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  val role: UserRole,

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "user_followers",
    joinColumns = [JoinColumn(name = "user_id")],
    inverseJoinColumns = [JoinColumn(name = "other_user_id")]
  )
  var following: MutableSet<UserEntity>? = HashSet(),

  @ManyToMany(mappedBy = "following", fetch = FetchType.EAGER)
  var followers: MutableSet<UserEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.REMOVE], fetch = FetchType.EAGER)
  val favoriteItemLists: MutableSet<FavoriteListEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.REMOVE], fetch = FetchType.EAGER)
  val reviewList: MutableSet<ReviewEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
  val commentList: MutableSet<CommentEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
  val replyList: MutableSet<CommentEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.REMOVE], fetch = FetchType.EAGER)
  val votes: MutableSet<ReviewVoting>? = HashSet()
) {

  constructor(user: User) : this(
    user.userId,
    user.externalId,
    user.username,
    user.email,
    user.role
  )

  constructor(otherUserId: UUID) : this(
    otherUserId, null, "", "", UserRole.STANDARD_USER
  )

  fun mapToDomain(): User {
    return User(
      userId = userId,
      externalId = externalId,
      username = username,
      email = email,
      role = role
    )
  }

  fun clearAllLists() {
    // Clear associations
    following?.forEach {
      it.followers?.remove(this)
    }
    followers?.forEach { it.following?.remove(this) }

    // Clear lists
    following?.clear()
    followers?.clear()
    favoriteItemLists?.clear()
    reviewList?.clear()
    commentList?.clear()
  }
}