import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { InvestmentGraphDataService } from '../investment-graph-data.service'
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-investment-graph',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './investment-graph.component.html',
  styleUrl: './investment-graph.component.css'
})

export class InvestmentsComponent {
public chartOptions: AgChartOptions = {
  data: [],
  series: []
};
constructor(private graphDataService: InvestmentGraphDataService, private sharedDataService: SharedDataService) {}
ngOnInit() {
  this.graphDataService.getGraphData().subscribe(data => {
      this.chartOptions = {
        data: [
          { asset: "Stocks", amount: data.stock },
          { asset: "Bonds", amount: data.bond },
          { asset: "Cash", amount: data.cash },
        ],
        title: {
          text: "Portfolio Composition",
        },
        series: [
          {
            type: "donut",
            calloutLabelKey: "asset",
            angleKey: "amount",
            innerRadiusRatio: 0.8,
            innerLabels: [
              {
                  text: `Total Investments: \n $ ${Number((data.stock+data.bond+data.cash).toFixed(3))}`,
                  spacing: 4,
                  fontSize: 10,
                  color: 'black',
              },
            ],
          },
        ],
      };
      this.sharedDataService.updateCashAvailable(data.cash)
      this.sharedDataService.updatetotalPortfolioValue(data.cash + data.stock + data.bond)
    }
  )};
}

