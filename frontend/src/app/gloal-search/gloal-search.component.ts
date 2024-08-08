import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GloalSearchService } from '../gloal-search.service';
import { TradingModalComponent } from '../trading-modal/trading-modal.component';


interface SearchOption {
  name: string,
  ticker: string,
}

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
  selector: 'app-gloal-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gloal-search.component.html',
  styleUrl: './gloal-search.component.css'
})
export class GloalSearchComponent {
  tickerInput: string = ""
  constructor(private searchService: GloalSearchService, private modalService: NgbModal) {}

  trade(ticker: string) {
    let instrument: PortfolioInstrument = {
      name: '-',
      ticker: ticker,
      instrumentType: 'stock',
      sharesOwned: 0,
      marketValue: 0,
      currentPrice: 0,
      todaysReturns: 0,
      totalReturn: 0,
      p_l: 0
    };
    const modalRef = this.modalService.open(TradingModalComponent);
    modalRef.componentInstance.instrument = instrument;
  }
}
