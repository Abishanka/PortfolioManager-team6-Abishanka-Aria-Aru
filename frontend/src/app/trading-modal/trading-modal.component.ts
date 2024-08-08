import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TradingModalService } from '../trading-modal.service';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';

interface PortfolioInstrument {
  name: string;
  ticker: string;
  instrumentType: string;
  sharesOwned: number;
  marketValue: number;
  currentPrice: number;
  todaysReturns: number;
  totalReturn: number;
  p_l: number;
}

@Component({
  selector: 'app-trading-modal',
  standalone: true,
  imports: [FormsModule, AgCharts, CommonModule, ReactiveFormsModule],
  templateUrl: './trading-modal.component.html',
  styleUrl: './trading-modal.component.css'
})
export class TradingModalComponent {
  @Input() instrument!: PortfolioInstrument;
  shares: number = 0;
  selectedPeriod: string = '1mo'; // default period

  public chartOptions: AgChartOptions = {
    data: [],
    series: [{
      type: 'line',
      xKey: 'date',
      yKey: 'price',
      xName: 'Date',
      yName: 'Price',
      marker: {
      enabled: true
      }
  }]
  };
  periods: string[] = ['1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'];
  stockInfo: any = {}; // Add this to hold stock information


constructor(private tradingService: TradingModalService, public activeModal: NgbActiveModal) {  }

  ngOnInit(): void {
  if (this.instrument) {
    this.updateChart(this.selectedPeriod);
    this.fetchStockInfo();
  }
}
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['instrument'] && this.instrument) {
        this.updateChart(this.selectedPeriod);
      }
    }

  buyInstrument(instrumentType: string, ticker: string, amount: number): void {
    this.tradingService.buyInstrument(instrumentType, ticker, amount).subscribe(response => {
      console.log(response);
    });
  }
  sellInstrument(instrumentType: string, ticker: string, amount: number): void {
    this.tradingService.sellInstrument(instrumentType, ticker, amount).subscribe(response => {
      console.log(response);
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }
  onPeriodChange(period: string): void {
      this.selectedPeriod = period;
      this.updateChart(period);
    }
  updateChart(period: string): void {
    console.log(period);
    this.tradingService.getStockHistory(this.instrument.ticker, period).subscribe(data => {
      console.log(this.instrument.ticker);
      const formattedData = data.map((item: any) => ({
        date: period === '1d' ? item.time_Min : item.time_Date,
        price: item.Close
      }));
      console.log(formattedData); // Check the output format
      this.chartOptions = {
        ...this.chartOptions,
        data: formattedData
      };
    }
  );
}
fetchStockInfo(): void {
    console.log(this.instrument.ticker);
this.tradingService.getStockInfo(this.instrument.ticker).pipe(
      catchError(error => {
        console.error('Error fetching stock info:', error);
        return of({});
      })
    ).subscribe(info => {
      this.stockInfo = info;
    });
  }
}
