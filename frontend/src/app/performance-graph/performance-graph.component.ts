import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-performance-graph',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './performance-graph.component.html',
  styleUrl: './performance-graph.component.css'
})
export class PerformanceGraphComponent {
public chartOptions: AgChartOptions;
constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', netWorth: 2.3, portfolioNet: 162000 },
        { month: 'Mar', netWorth: 6.3, portfolioNet: 302000 },
        { month: 'May', netWorth: 16.2, portfolioNet: 800000 },
        { month: 'Jul', netWorth: 22.8, portfolioNet: 1254000 },
        { month: 'Sep', netWorth: 14.5, portfolioNet: 950000 },
        { month: 'Nov', netWorth: 8.9, portfolioNet: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'line', xKey: 'month', yKey: 'portfolioNet' }]
    };
  }
}
