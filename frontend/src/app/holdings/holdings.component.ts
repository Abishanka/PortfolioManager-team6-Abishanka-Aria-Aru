import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, LowerCasePipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';

interface PortfolioInstrument {
  name: string;
  ticker: string,              
  sharesOwned: number;  
  marketValue: number;
  currentPrice: number;    
  todaysReturns: number;    
  totalReturn: number;     
}

const PORTFOLIO: PortfolioInstrument[] = [
  {
    name: "Apple Inc.",
    ticker: "AAPL",
    sharesOwned: 50,
    marketValue: 7500,
    currentPrice: 150,
    todaysReturns: -200,
    totalReturn: 1000
  },
  {
    name: "Microsoft Corporation",
    ticker: "MSFT",
    sharesOwned: 30,
    marketValue: 9000,
    currentPrice: 300,
    todaysReturns: 150,
    totalReturn: -1200
  },
  {
    name: "Amazon.com Inc.",
    ticker: "AMZN",
    sharesOwned: 10,
    marketValue: 3500,
    currentPrice: 350,
    todaysReturns: 50,
    totalReturn: 300
  },
  {
    name: "Tesla Inc.",
    ticker: "TSLA",
    sharesOwned: 20,
    marketValue: 16000,
    currentPrice: 800,
    todaysReturns: 500,
    totalReturn: -4000
  },
  {
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    sharesOwned: 5,
    marketValue: 14000,
    currentPrice: 2800,
    todaysReturns: 200,
    totalReturn: 1800
  }
];


function search(text: string, pipe: PipeTransform): PortfolioInstrument[] {
	return PORTFOLIO.filter((instrument) => {
		const term = text.toLowerCase();
		return (
			instrument.name.toLowerCase().includes(term) ||
			pipe.transform(instrument.ticker).includes(term)
    );
	});
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
  portfolioinstruments$: Observable<PortfolioInstrument[]>;
	filter = new FormControl('', { nonNullable: true });

	constructor(pipe: LowerCasePipe) {
		this.portfolioinstruments$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
	} 

}
