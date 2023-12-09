package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.*
import models.FavoriteItemList
import models.ListType

import java.sql.Timestamp
import java.util.*

@Entity
@NoArgConstructor
@Table(name = "FAVORITE_ITEM_LISTS")
class FavoriteListEntity(
  @Id
  @Column(name = "list_id")
  val listId: UUID,

  @Enumerated(EnumType.STRING)
  @Column(name = "itemType", nullable = false)
  val type: ListType,

  @ManyToOne()
  @JoinColumn(name = "user_id", nullable = false)
  val user: UserEntity,

  @Column(name = "name", nullable = false)
  val name: String,

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "LIST_ITEM_ASSOCIATION",
    joinColumns = [JoinColumn(name = "list_id")],
    inverseJoinColumns = [JoinColumn(name = "item_id")]
  )
  val items: MutableSet<ItemEntity>,

  @Column(name = "timestamp", nullable = false)
  val timestamp: Timestamp
) {
  constructor(list: FavoriteItemList) : this(
    listId = list.listId,
    type = list.type,
    user = UserEntity(list.userId),
    name = list.name,
    items = list.items.map { item -> ItemEntity(item) }.toHashSet(),
    timestamp = list.timestamp,
  )

  fun mapToDomain(): FavoriteItemList {
    return FavoriteItemList(
      this.listId,
      this.user.userId,
      this.name,
      this.type,
      this.items.map {itemEntity -> itemEntity.mapToDomain() }.toHashSet(),
      this.timestamp
    )
  }
}