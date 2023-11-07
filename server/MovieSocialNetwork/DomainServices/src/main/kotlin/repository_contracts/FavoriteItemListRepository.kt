package repository_contracts

import models.FavoriteItemList
import models.Movie
import java.util.UUID

interface FavoriteItemListRepository{
  fun createFavoriteMovieList(favoriteItemList: FavoriteItemList)
  fun updateFavoriteItemList(favoriteItemList: FavoriteItemList)
  fun deleteFavoriteItemList(listId: UUID)
  fun getFavoriteItemListById(listId: UUID): FavoriteItemList?
}
