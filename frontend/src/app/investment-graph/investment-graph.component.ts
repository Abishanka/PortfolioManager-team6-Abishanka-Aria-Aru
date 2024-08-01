import { Component } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-investment-graph',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './investment-graph.component.html',
  styleUrl: './investment-graph.component.css'
})
export class InvestmentsComponent {
public chartOptions: AgChartOptions;
constructor() {
    this.chartOptions = {
      data: [{ asset: "Stocks", amount: 60000 },
    { asset: "Bonds", amount: 40000 },
    { asset: "Cash", amount: 7000 },
    ],
      title: {
        text: "Portfolio Composition",
      },
      series: [
        {
          type: "donut",
          calloutLabelKey: "asset",
          angleKey: "amount",
          innerRadiusRatio: 0.7,
        },
      ],
    };
  }
}

