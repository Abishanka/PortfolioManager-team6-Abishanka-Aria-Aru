import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class HoldingsService {
  private apiUrl = 'http://127.0.0.1:5000/currentholdings';
  constructor(private http: HttpClient) { }
  getPortfolio(): Observable<PortfolioInstrument[]> {
    return this.http.get<PortfolioInstrument[]>(this.apiUrl);
  }
}
