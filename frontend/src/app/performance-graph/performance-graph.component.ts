import { Component, OnInit } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { PerformanceGraphService } from '../performance-graph.service';

interface GraphData {
  bonds: number;
  cash: number;
  date: string;
  stocks: number;
  total: number;
}

@Component({
  selector: 'app-performance-graph',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './performance-graph.component.html',
  styleUrls: ['./performance-graph.component.css'] // Fixed typo here
})
export class PerformanceGraphComponent implements OnInit {
  public chartOptions: AgChartOptions = {
    data: [],
    series: []
  };

  constructor(private graphDataService: PerformanceGraphService) {}

  ngOnInit() {
    this.graphDataService.getGraphData().subscribe(data => {
      const formattedData = data.map((item: GraphData) => ({
        ...item,
        date: new Date(item.date),
        total: Number(item.total)
      }));
      this.chartOptions = {
        data: formattedData,
        series: [
          {
            type: 'area',
            xKey: 'date',
            yKey: 'total',
            fill: 'darkgreen'
          }
        ],
        axes: [
          {
            type: 'time',
            position: 'bottom'
          },
          {
            type: 'number',
            position: 'left'
          }
        ]
      };
    });
  }
}