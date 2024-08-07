import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceGraphService {
  private apiUrl = 'http://127.0.0.1:5000/portfoliooverview';
  constructor(private http: HttpClient) {}
  getGraphData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
