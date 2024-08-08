import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TradingModalService } from '../trading-modal.service';

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
  imports: [FormsModule],
  templateUrl: './trading-modal.component.html',
  styleUrl: './trading-modal.component.css'
})
export class TradingModalComponent {
  @Input() instrument!: PortfolioInstrument;
  shares: number = 0;

  constructor(private tradingService: TradingModalService, public activeModal: NgbActiveModal) {  }

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
}
