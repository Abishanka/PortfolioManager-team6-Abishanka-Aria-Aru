import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketOverviewService {
  private apiUrl = 'http://127.0.0.1:5000/marketOverview';
  constructor(private http: HttpClient) {}
  getMarketOverview(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
