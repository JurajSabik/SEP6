package services

import models.FavoriteItemList
import repository_contracts.FavoriteItemListRepository
import validators.FavoriteItemListValidator
import java.util.UUID

class FavoriteListService(
  private val repository: FavoriteItemListRepository,
  private val validator: FavoriteItemListValidator = FavoriteItemListValidator()
) {
  suspend fun createFavoriteItemList(list: FavoriteItemList) : UUID{
    validator.validate(list)
    repository.createOrUpdateItemsForAList(list)
    return repository.createFavoriteMovieList(list)
  }

  suspend fun getFavoriteItemListById(listId: UUID): FavoriteItemList? {
    return repository.getFavoriteItemListById(listId)
  }

  suspend fun deleteFavoriteItemListById(listId: UUID) {
     repository.deleteListItemAssociation(listId)
     repository.deleteFavoriteItemList(listId)
  }

  suspend fun updateFavoriteItemList(favoriteItemList: FavoriteItemList) {
    validator.validate(favoriteItemList)
    repository.createOrUpdateItemsForAList(favoriteItemList)
    repository.updateFavoriteItemList(favoriteItemList)
  }

  suspend fun getAllFavoriteItemListsByUserId(userId: UUID): List<FavoriteItemList> {
    return repository.getAllFavoriteItemListsByUserId(userId)
  }
}