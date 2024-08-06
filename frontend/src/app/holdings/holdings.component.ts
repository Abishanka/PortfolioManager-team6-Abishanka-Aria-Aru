import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, LowerCasePipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalStacked} from '../modal/modal.component';
import { HoldingsService } from '../holdings.service'; // Adjust the import path as necessary


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
  selector: 'app-holdings',
  standalone: true,
  imports: [LowerCasePipe, AsyncPipe, ReactiveFormsModule, NgbHighlight, CommonModule, NgbdModalStacked],
  templateUrl: './holdings.component.html',
  styleUrl: './holdings.component.css',
  providers: [LowerCasePipe]
})
export class HoldingsComponent {
  portfolioinstruments$!: Observable<PortfolioInstrument[]>;
  
  constructor(private holdingsService: HoldingsService) {}

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
}
