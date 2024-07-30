import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { MarketComponent } from './market/market.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { InvestmentsComponent } from './investments/investments.component';
import { PerformanceGraphComponent } from './performance-graph/performance-graph.component';

import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
NetWorthComponent,
MarketComponent,
HoldingsComponent,
InvestmentsComponent,
PerformanceGraphComponent,
AgCharts],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio Manager';

}
