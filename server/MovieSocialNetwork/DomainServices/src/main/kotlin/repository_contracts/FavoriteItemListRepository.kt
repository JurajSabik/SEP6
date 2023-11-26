package repository_contracts

import models.FavoriteItemList
import models.Movie
import java.util.UUID

interface FavoriteItemListRepository{
  suspend fun createFavoriteMovieList(favoriteItemList: FavoriteItemList)
  suspend fun updateFavoriteItemList(favoriteItemList: FavoriteItemList)
  suspend fun deleteFavoriteItemList(listId: UUID)
  suspend fun getFavoriteItemListById(listId: UUID): FavoriteItemList?
}
