package com.sep6.infrastructureservices.persistence.services

import com.sep6.infrastructureservices.persistence.entities.FavoriteListEntity
import com.sep6.infrastructureservices.persistence.entities.ItemEntity
import com.sep6.infrastructureservices.persistence.exceptions.ResourceNotFoundException
import com.sep6.infrastructureservices.persistence.repositories.FavoriteListPersistenceRepository
import com.sep6.infrastructureservices.persistence.repositories.ItemRepository
import com.sep6.infrastructureservices.persistence.repositories.UserPersistenceRepository
import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.persistence.EntityManager
import jakarta.transaction.Transactional
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import models.FavoriteItemList
import models.Item
import org.springframework.stereotype.Service
import org.springframework.transaction.support.TransactionTemplate
import repository_contracts.FavoriteItemListRepository
import java.util.*

private val logger = KotlinLogging.logger {}
@Service
class FavoriteListPersistenceService(
  private val favoriteListPersistenceRepository: FavoriteListPersistenceRepository,
  private val userRepository: UserPersistenceRepository,
  private val itemRepository: ItemRepository,
  private val transactionTemplate: TransactionTemplate
) :
  FavoriteItemListRepository {


  private val entityManager: EntityManager? = null
  override suspend fun createFavoriteMovieList(favoriteItemList: FavoriteItemList): UUID = withContext(Dispatchers.IO) {
    when (userRepository.existsById(favoriteItemList.userId)) {
      true -> return@withContext favoriteListPersistenceRepository.save(FavoriteListEntity(favoriteItemList)).listId
      false -> throw ResourceNotFoundException("User with id: ${favoriteItemList.userId} does not exist.")
    }
  }

  override suspend fun createOrUpdateItemsForAList(favoriteItemList: FavoriteItemList): Unit =
    withContext(Dispatchers.IO) {
      when (userRepository.existsById(favoriteItemList.userId)) {
        true -> {
          handleItemsInList(favoriteItemList)
        }
        false -> throw ResourceNotFoundException("User with id: ${favoriteItemList.userId} does not exist.")
      }
    }

  private fun handleItemsInList(favoriteItemList: FavoriteItemList) {
    val items = favoriteItemList.items.toMutableSet()
    for (item in favoriteItemList.items) {
      if (!itemRepository.existsByExternalId(item.externalId)) {
        itemRepository.save(ItemEntity(item))
      } else {
        mapItemByExternalId(item, items)
      }
    }

    favoriteItemList.items = items
  }

  private fun mapItemByExternalId(item: Item, items: MutableSet<Item>) {
    val existingItem = itemRepository.findByExternalId(item.externalId).mapToDomain()
    items.remove(item)
    items.add(existingItem)
  }

  override suspend fun updateFavoriteItemList(favoriteItemList: FavoriteItemList): Unit = withContext(Dispatchers.IO) {
    when (favoriteListPersistenceRepository.existsById(favoriteItemList.listId)) {
      false -> throw ResourceNotFoundException("List to update (id: ${favoriteItemList.listId}) does not exist.")
      true -> favoriteListPersistenceRepository.save(FavoriteListEntity(favoriteItemList))
    }
  }

  override suspend fun deleteFavoriteItemList(listId: UUID): Unit = withContext(Dispatchers.IO) {
    when (favoriteListPersistenceRepository.existsById(listId)) {
      false -> throw ResourceNotFoundException("List to delete (id: ${listId}) does not exist.")
      true -> {
        deleteListItemAssociation(listId)
        var list : FavoriteListEntity? = null
        favoriteListPersistenceRepository.findById(listId)
          .ifPresentOrElse({ list = it }, { throw ResourceNotFoundException("List with id $listId not found") })
        favoriteListPersistenceRepository.delete(list!!)
      }
    }
  }

  override suspend fun getFavoriteItemListById(listId: UUID): FavoriteItemList? = withContext(Dispatchers.IO) {
    when (favoriteListPersistenceRepository.existsById(listId)) {
      false -> throw ResourceNotFoundException("List to update (id: ${listId}) does not exist.")
      true -> return@withContext favoriteListPersistenceRepository.findById(listId).get().mapToDomain()
    }
  }

  override fun deleteListItemAssociation(listId: UUID): Unit  {
    transactionTemplate.execute {
        entityManager?.createNativeQuery("DELETE FROM list_item_association WHERE list_id = :listId")
          ?.setParameter("listId", listId)
          ?.executeUpdate()
        it.flush()
    }
  }
  override suspend fun getAllFavoriteItemListsByUserId(userId: UUID): List<FavoriteItemList> =
    withContext(Dispatchers.IO) {
      when (userRepository.existsById(userId)) {
        false -> {
          throw ResourceNotFoundException("User with id $userId doesn't exist.")
        }
        true -> return@withContext favoriteListPersistenceRepository.findAllByUserUserId(userId)
          .map { favoriteListEntity -> favoriteListEntity.mapToDomain() }
      }
    }
}