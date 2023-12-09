package statistics.dtos

import models.ListType
import java.sql.Timestamp

data class ListItemCountChart(val listName: String, val itemCount: Int)
data class ListTypePercentage(val listType: ListType, val percentage: Double)
data class ListTimeSeriesData(val listName: String, val timestamp: Timestamp)