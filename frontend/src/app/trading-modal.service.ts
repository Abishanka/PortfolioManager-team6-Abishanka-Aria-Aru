import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingModalService {
  private buyInstrumentUrl = 'http://127.0.0.1:5000/addinstrument/';
  private sellInstrumentUrl = 'http://127.0.0.1:5000/delinstrument/';
  private stockHistoryUrl = 'http://127.0.0.1:5000/stockhistory';
  private stockInfoUrl = 'http://127.0.0.1:5000/stockinfo';


  constructor(private http: HttpClient) { }
  buyInstrument(instrumenttype: string, ticker: string, amount: number): Observable<any> {
    if (instrumenttype == "stock") {
      return this.http.get<any>(`${this.buyInstrumentUrl}\\${instrumenttype}?ticker=${ticker}&amount=${amount}`);
    }
    return of(null);
  }
  sellInstrument(instrumenttype: string, ticker: string, amount: number): Observable<any> {
    if (instrumenttype == "stock") {
      return this.http.get<any>(`${this.sellInstrumentUrl}\\${instrumenttype}?ticker=${ticker}&amount=${amount}`);
    }
    return of(null);
  }

  getStockHistory(ticker: string, period: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockHistoryUrl}?ticker=${ticker}&period=${period}`);
  }

  getStockInfo(ticker: string): Observable<any[]> {
    return this.http.get<any>(`${this.stockInfoUrl}?ticker=${ticker}`);
  }


}
