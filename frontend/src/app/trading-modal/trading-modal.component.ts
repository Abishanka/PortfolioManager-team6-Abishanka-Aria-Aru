import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

interface PortfolioInstrument {
  name: string;
  ticker: string;
  instrumentType: string;              
  sharesOwned: number;
  marketValue: number;
  currentPrice: number;
  todaysReturns: number;
  totalReturn: number;
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

  constructor(public activeModal: NgbActiveModal) {  }

  buyShares(): void {}
  sellShares(): void {}

  closeModal(): void {
    this.activeModal.close();
  }
}
