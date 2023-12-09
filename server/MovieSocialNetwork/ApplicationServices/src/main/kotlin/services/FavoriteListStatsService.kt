package services

import repository_contracts.FavoriteItemListRepository
import statistics.FavoriteListStats
import statistics.dtos.ListTypePercentage
import statistics.dtos.ListItemCountChart
import statistics.dtos.ListTimeSeriesData
import java.util.UUID

class FavoriteListStatsService ( private val favoriteListRepository: FavoriteItemListRepository)
{
  private val favoriteListStats: FavoriteListStats = FavoriteListStats()

  suspend fun getListTypeBarChartData(userId: UUID): List<ListTypePercentage> {
    val userLists = favoriteListRepository.getAllFavoriteItemListsByUserId(userId)
    if (userLists.isNotEmpty()){
      return favoriteListStats.calculateItemTypePercentage(userLists.toMutableSet())
    }

    return listOf()
  }
  suspend fun createTimeSeriesData(userId: UUID): List<ListTimeSeriesData> {
    val userLists = favoriteListRepository.getAllFavoriteItemListsByUserId(userId)
    if (userLists.isNotEmpty()){
      return favoriteListStats.createTimeSeriesData(userLists.toMutableSet())
    }

    return listOf()
  }

  suspend fun createListItemCountChart(userId: UUID): List<ListItemCountChart> {
    val userLists = favoriteListRepository.getAllFavoriteItemListsByUserId(userId)
    if (userLists.isNotEmpty()){
      return favoriteListStats.createListItemCountChart(userLists.toMutableSet())
    }

    return listOf()
     }
  }