import models.FavoriteItemList
import models.Item
import models.ListType
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import statistics.FavoriteListStats
import java.sql.Timestamp
import java.util.*

class FavoriteListStatsTest {

  @Test
  fun calculateItemTypePercentage() {
    val favoriteLists = setOf(
      FavoriteItemList(userId = someUserId, name = "List1", type = someListType1, timestamp = someTimestamp),
      FavoriteItemList(userId = someUserId, name = "List2", type = someListType2, timestamp = someTimestamp),
      FavoriteItemList(userId = someUserId, name = "List3", type = someListType1, timestamp = someTimestamp)
    )

    val favoriteListStats = FavoriteListStats()

    val result = favoriteListStats.calculateItemTypePercentage(favoriteLists)

    // Assuming some specific values for the test data
    assertEquals(2, result.size)
    assertEquals(someListType1, result[0].listType)
    assertEquals(66.66666666666666, result[0].percentage, 0.0001)
    assertEquals(someListType2, result[1].listType)
    assertEquals(33.33333333333333, result[1].percentage, 0.0001)
  }

  @Test
  fun createTimeSeriesData() {
    val favoriteLists = setOf(
      FavoriteItemList(userId = someUserId, name = "List1", type = someListType1, timestamp = someTimestamp),
      FavoriteItemList(userId = someUserId, name = "List2", type = someListType2, timestamp = someTimestamp)
    )

    val favoriteListStats = FavoriteListStats()

    val result = favoriteListStats.createTimeSeriesData(favoriteLists)

    assertEquals(2, result.size)
    assertEquals("List1", result[0].listName)
    assertEquals(someTimestamp, result[0].timestamp)
    assertEquals("List2", result[1].listName)
    assertEquals(someTimestamp, result[1].timestamp)
  }

  @Test
  fun createListItemCountChart() {
    val favoriteLists = setOf(
      FavoriteItemList(userId = someUserId, name = "List1", type = someListType1, timestamp = someTimestamp, items = mutableSetOf(
        Item(UUID.randomUUID(), "id"), Item(UUID.randomUUID(), "id"))),
      FavoriteItemList(userId = someUserId, name = "List2", type = someListType2, timestamp = someTimestamp, items = mutableSetOf(Item(UUID.randomUUID(), "id")))
    )

    val favoriteListStats = FavoriteListStats()

    val result = favoriteListStats.createListItemCountChart(favoriteLists)

    // Assuming some specific values for the test data
    assertEquals(2, result.size)
    assertEquals("List1", result[0].listName)
    assertEquals(2, result[0].itemCount)
    assertEquals("List2", result[1].listName)
    assertEquals(1, result[1].itemCount)
  }

  companion object {
    val someUserId = UUID.randomUUID()
    val someListType1 = ListType.MOVIE
    val someListType2 = ListType.STAR
    val someTimestamp = Timestamp(System.currentTimeMillis())
  }
}
