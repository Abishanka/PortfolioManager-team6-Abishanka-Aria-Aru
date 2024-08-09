import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = 'http://127.0.0.1:5000/netcashdeposits';
  constructor(private http: HttpClient) { }
  getNetCashDeposits(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}