package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import java.time.LocalDate
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

  @Column(name = "username", nullable = false, unique = true)
  val username: String,

  @Column(name = "email", nullable = false, unique = true)
  val email: String,

  @Column(name = "birthday", nullable = false)
  val birthday: LocalDate,

  @Enumerated(EnumType.STRING)
  @Column(name = "role", nullable = false)
  val role: UserRole,

  @ManyToMany
  @JoinTable(
    name = "user_followers",
    joinColumns = [JoinColumn(name = "user_id")],
    inverseJoinColumns = [JoinColumn(name = "follower_id")]
  )
  var followers: MutableSet<UserEntity>? = HashSet(),

  @ManyToMany(mappedBy = "followers")
  var following: MutableSet<UserEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
  val favoriteItemLists: MutableSet<FavoriteListEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
  val reviewList: MutableSet<ReviewEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
  val commentList: MutableSet<CommentEntity>? = HashSet(),

  @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
  val replyList: MutableSet<CommentEntity>? = HashSet()
) {
  constructor(user: User) : this(
    user.userId,
    user.username,
    user.email,
    user.birthday,
    user.role
  )

  constructor(otherUserId: UUID) : this(
    otherUserId, "", "", LocalDate.now(), UserRole.STANDARD_USER
  )

  fun mapToDomain(): User {
    return User(
      userId = userId,
      username = username,
      email = email,
      birthday = birthday,
      role = role
    )
  }
}