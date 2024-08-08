import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradingModalService {
  private buyInstrumentUrl = 'http://127.0.0.1:5000/addinstrument/';
  private sellInstrumentUrl = 'http://127.0.0.1:5000/delinstrument/';
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
}
