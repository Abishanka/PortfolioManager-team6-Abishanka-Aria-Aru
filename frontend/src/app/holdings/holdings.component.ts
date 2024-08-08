import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, LowerCasePipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { HoldingsService } from '../holdings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TradingModalComponent } from '../trading-modal/trading-modal.component';


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
  selector: 'app-holdings',
  standalone: true,
  imports: [LowerCasePipe, AsyncPipe, ReactiveFormsModule, NgbHighlight, CommonModule],
  templateUrl: './holdings.component.html',
  styleUrl: './holdings.component.css',
  providers: [LowerCasePipe]
})
export class HoldingsComponent {
  portfolioinstruments$!: Observable<PortfolioInstrument[]>;
  
  constructor(private holdingsService: HoldingsService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.holdingsService.getPortfolio().subscribe(
      (instruments: PortfolioInstrument[]) => {
        const filteredInstruments = instruments.filter(instrument => instrument.instrumentType === 'stock');
        this.portfolioinstruments$ = of(filteredInstruments);
      }
    );
  }

  trackByName(index: number, instrument: PortfolioInstrument): string {
    return instrument.name;
  }

  openTradingModal(instrument: PortfolioInstrument): void {
    const modalRef = this.modalService.open(TradingModalComponent);
    modalRef.componentInstance.instrument = instrument;
  }
}
