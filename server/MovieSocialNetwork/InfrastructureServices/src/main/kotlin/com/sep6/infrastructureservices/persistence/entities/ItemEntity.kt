package com.sep6.infrastructureservices.persistence.entities

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import models.Item
import java.util.UUID

@Entity
@NoArgConstructor
@Table(name = "FAVORITE_ITEMS")
class ItemEntity(
  @Id
  @Column(name = "itemId")
  val itemId: UUID,

  @Column(name = "externalId", unique = true, nullable = false)
  val externalId: String
) {
  constructor(item: Item) : this(item.itemId, item.externalId)
}