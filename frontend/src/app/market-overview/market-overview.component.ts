import { Component, OnInit } from '@angular/core';
import { MarketOverviewService } from '../market-overview.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-overview.component.html',
  styleUrl: './market-overview.component.css'
})
export class MarketOverviewComponent implements OnInit {
  public marketData: any = {
  sp500: {},
  nasdaq: {},
  dow_jones: {}
  };

  constructor(private marketOverviewService: MarketOverviewService) {}
  ngOnInit(): void {
      this.marketOverviewService.getMarketOverview().subscribe(
      data => {
        this.marketData = data;
      });
    }
}
