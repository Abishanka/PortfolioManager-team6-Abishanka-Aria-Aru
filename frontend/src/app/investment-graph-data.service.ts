import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentGraphDataService { 
  private apiUrl = 'https://';
  constructor(private http: HttpClient) {}
  getGraphData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
