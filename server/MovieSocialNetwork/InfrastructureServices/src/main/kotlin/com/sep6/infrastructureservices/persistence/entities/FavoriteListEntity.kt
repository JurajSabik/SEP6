package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import models.FavoriteItemList
import models.Item
import models.User
import java.sql.Timestamp
import java.util.*

@Entity
@NoArgConstructor
@Table(name = "FAVORITE_ITEM_LISTS")
class FavoriteListEntity(
  @Id
  @Column(name = "list_id")
  val listId: UUID,

  @ManyToOne(cascade = [CascadeType.REMOVE])
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @Column(name = "name", nullable = false)
  val name: String,

  @OneToMany(cascade = [CascadeType.PERSIST], fetch = FetchType.LAZY)
  val items: List<ItemEntity>,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp
) {
  constructor(list: FavoriteItemList) : this(
    listId = list.listId,
    user = UserEntity(list.userId),
    name = list.name,
    items = list.items.map { item -> ItemEntity(item) },
    timestamp = list.timestamp,
  )
}