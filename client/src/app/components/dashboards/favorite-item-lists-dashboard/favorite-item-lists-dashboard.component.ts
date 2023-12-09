import {Component, Input} from '@angular/core';
import {ListItemCount} from "@models/stats-dtos/favorite-item-lists/list-item-count";
import {ListTimeData} from "@models/stats-dtos/favorite-item-lists/list-time-data";
import {ListTypePercentage} from "@models/stats-dtos/favorite-item-lists/list-type-percentage";
import {FavoriteListStatsService} from "@services/statistics/favorite-item-list-stats.service";
import {ListDashboardData} from "@models/stats-dtos/favorite-item-lists/list-dashboard-data";

@Component({
  selector: 'app-favorite-item-lists-dashboard',
  templateUrl: './favorite-item-lists-dashboard.component.html',
  styleUrls: ['./favorite-item-lists-dashboard.component.css']
})
export class FavoriteItemListsDashboardComponent {
  @Input() userId: string | undefined;
  dashboardData: ListDashboardData | undefined;
  pieChartOptions: any;
  barChartOptions: any;
  lineChartOptions: any;
  constructor(private favoriteListStatsService: FavoriteListStatsService) {
  }

  ngOnInit(): void {
    if (this.userId !== undefined) {
      this.favoriteListStatsService.getAllStatisticsData(this.userId).subscribe({
        next: (data) => {
          this.dashboardData = data
        },
        error: (error) => {
          console.error('Error fetching dashboard data', error);
        }
      });
    }
  }

  public getPieChartOptions(): any {
    if (this.dashboardData !== undefined) {
      const chartData: ListTypePercentage[] = this.dashboardData?.listTypeStats;
      const dataPoints = chartData?.map((item) => ({y: item.percentage, label: item.listType}));

      return {
        title: {
          text: 'List Type Percentage',
        },
        data: [
          {
            type: 'pie',
            showInLegend: true,
            legendText: '{label}',
            dataPoints: dataPoints,
          },
        ],
      };

    }
  }

  public getBarChartOptions(): any {
    if (this.dashboardData !== undefined) {
      const chartData: ListItemCount[] = this.dashboardData?.listItemCountChart;
      const dataPoints = chartData.map((item) => ({
        y: item.itemCount,
        label: item.listName,
      }));

      return {
        title: {
          text: 'Item Count Chart',
        },
        axisX: {
          title: 'List Name',
        },
        axisY: {
          title: 'Item Count',
        },
        data: [
          {
            type: 'column',
            dataPoints: dataPoints,
          },
        ],
      };

    }

  }

  public getLineChart(): any {
    if (this.dashboardData !== undefined) {
      const chartData: ListTimeData[] = this.dashboardData?.listTimeSeriesData;
      const dataByDate: Map<string, { itemCount: number; listNames: string[] }> = new Map();

      chartData.forEach((item) => {
        const dateKey = new Date(item.timestamp).toLocaleDateString();
        if (!dataByDate.has(dateKey)) {
          dataByDate.set(dateKey, { itemCount: 0, listNames: [] });
        }
        const dataDateItem = dataByDate.get(dateKey)
          if(dataDateItem !== undefined) {
            dataDateItem.itemCount++;
            dataByDate.get(dateKey)?.listNames.push(item.listName);
          }
      });

      const dataPoints = Array.from(dataByDate.entries()).map(([dateKey, { itemCount, listNames }]) => ({
        x: new Date(dateKey),
        y: itemCount,
        listNames: listNames.join('<br>')
      }));

      return {
        title: {
          text: 'Lists Created per Day',
        },
        axisX: {
          title: 'Date',
          valueFormatString: 'DD/MM/YYYY',
          interval:1,
          intervalType: "day"
        },
        axisY: {
          title: 'Number of Lists',
        },
        data: [
          {
            type: 'line',
            toolTipContent: "No of lists created this day: {y} <br> Date: {x} <br> List names: <br> {listNames}",
            dataPoints: dataPoints,
          },
        ],
      };

    }
  }
}
