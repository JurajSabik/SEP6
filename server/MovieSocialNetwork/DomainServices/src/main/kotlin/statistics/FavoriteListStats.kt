package statistics

import models.FavoriteItemList
import statistics.dtos.ListTypePercentage
import statistics.dtos.ListItemCountChart
import statistics.dtos.ListTimeSeriesData


class FavoriteListStats() {
  fun calculateItemTypePercentage(favoriteLists: MutableSet<FavoriteItemList>): List<ListTypePercentage> {
    val totalLists = favoriteLists.size.toDouble()
    val typeCounts = favoriteLists
      .groupingBy { it.type }
      .eachCount()
    return typeCounts.map { (type, count) ->
      ListTypePercentage(type, (count.toDouble() / totalLists) * 100)
    }
  }

  fun createTimeSeriesData( favoriteLists: MutableSet<FavoriteItemList>): List<ListTimeSeriesData> {
    return favoriteLists.map { list -> ListTimeSeriesData(list.name, list.timestamp)}
  }

  fun createListItemCountChart(favoriteLists: MutableSet<FavoriteItemList>): List<ListItemCountChart> {
    return favoriteLists.map { ListItemCountChart(it.name, it.items.size) }
  }
}

