import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TradingModalService } from '../trading-modal.service';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { SharedDataService } from '../shared-data.service';

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
  cashAvailable: number = 0; // to hold the cash available from shared service


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
  stockInfo: any = {}; // to hold stock information


  constructor(private tradingService: TradingModalService, public activeModal: NgbActiveModal, private sharedDataService: SharedDataService) {  }
  totalPortfolioValue: number = 0
  ngOnInit(): void {
    this.sharedDataService.cashAvailable.subscribe(data => this.totalPortfolioValue = Number(data.toFixed(3)));
    if (this.instrument) {
      this.updateChart(this.selectedPeriod);
      this.fetchStockInfo();
      this.sharedDataService.cashAvailable.subscribe(cash => this.cashAvailable = cash); // Get cash available

    }
  }
  ngOnChanges(changes: SimpleChanges): void {
      if (changes['instrument'] && this.instrument) {
        this.updateChart(this.selectedPeriod);
      }
    }

  buyInstrument(instrumentType: string, ticker: string, amount: number): void {
    const totalCost = amount * this.instrument.currentPrice;
    if (totalCost > this.cashAvailable) {
      alert('Insufficient cash available to buy the selected amount of stock.');
      return;
    }
    this.tradingService.buyInstrument(instrumentType, ticker, amount).subscribe(response => {
      console.log(response);
      if (response.status=='success') {
        alert(`Bought ${response.last_transaction[3]} shares of ${ticker} at $${response.last_transaction[4]} each.`);
      }
      else {
        alert('Trade Failed')
      }
      // window.location.reload()
    });
  }
  sellInstrument(instrumentType: string, ticker: string, amount: number): void {
    if (amount > this.instrument.sharesOwned) {
      alert('Cannot sell more shares than owned.');
      return;
    }
    this.tradingService.sellInstrument(instrumentType, ticker, amount).subscribe(response => {
      console.log(response);
      if (response.status=='success') {
        alert(`Sold ${response.last_transaction[3]} shares of ${ticker} at $${response.last_transaction[4]} each.`);
      }
      else {
        alert('Trade Failed')
      }
      window.location.reload()
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
