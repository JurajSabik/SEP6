package com.sep6.infrastructureservices.rest.controllers.dtos

import statistics.dtos.ListItemCountChart
import statistics.dtos.ListTimeSeriesData
import statistics.dtos.ListTypePercentage

data class DashboardData(
  val listTypeStats: List<ListTypePercentage>,
  val listTimeSeriesData: List<ListTimeSeriesData>,
  val listItemCountChart: List<ListItemCountChart>
)