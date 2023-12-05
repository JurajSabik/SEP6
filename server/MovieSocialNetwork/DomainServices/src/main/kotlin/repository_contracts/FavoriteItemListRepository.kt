package repository_contracts

import models.FavoriteItemList
import models.Movie
import java.util.UUID

interface FavoriteItemListRepository{
  suspend fun createFavoriteMovieList(favoriteItemList: FavoriteItemList): UUID
  suspend fun updateFavoriteItemList(favoriteItemList: FavoriteItemList)
  suspend fun deleteFavoriteItemList(listId: UUID)
  suspend fun getFavoriteItemListById(listId: UUID): FavoriteItemList?
  suspend fun getAllFavoriteItemListsByUserId(userId: UUID): List<FavoriteItemList>
  suspend fun createOrUpdateItemsForAList(favoriteItemList: FavoriteItemList)
  fun deleteListItemAssociation(listId: UUID)
}
