import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundsModalService {
  private buyInstrumentUrl = 'http://127.0.0.1:5000/addinstrument/';
  private sellInstrumentUrl = 'http://127.0.0.1:5000/delinstrument/';
  constructor(private http: HttpClient) { }
  depositCash(amount: number): Observable<any> {
      return this.http.get<any>(`${this.buyInstrumentUrl}\\cash?amount=${amount}`);
  }
  withdrawCash(amount: number): Observable<any> {
      return this.http.get<any>(`${this.sellInstrumentUrl}\\cash?amount=${amount}`);
  }
}
