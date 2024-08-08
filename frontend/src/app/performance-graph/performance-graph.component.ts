import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { PerformanceGraphService } from '../performance-graph.service'

@Component({
  selector: 'app-performance-graph',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './performance-graph.component.html',
  styleUrl: './performance-graph.component.css'
})
export class PerformanceGraphComponent {
public chartOptions: AgChartOptions={
  data: [],
  series: []
};
constructor(private graphDataService: PerformanceGraphService) {}
ngOnInit() {
  this.graphDataService.getGraphData().subscribe(data =>
  {
    console.log("List of holdings history"),


    this.chartOptions =
    {
      data: data,
      series: [
        { type: 'line',
          xKey: 'date',
          yKey: 'total'
        }
      ]
    };
  }
  )};
}

