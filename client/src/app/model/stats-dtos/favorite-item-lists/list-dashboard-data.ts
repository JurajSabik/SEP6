import {ListItemCount} from "@models/stats-dtos/favorite-item-lists/list-item-count";
import {ListTimeData} from "@models/stats-dtos/favorite-item-lists/list-time-data";
import {ListTypePercentage} from "@models/stats-dtos/favorite-item-lists/list-type-percentage";

export interface ListDashboardData {
  listItemCountChart: ListItemCount[];
  listTimeSeriesData: ListTimeData[];
  listTypeStats: ListTypePercentage[];
}
