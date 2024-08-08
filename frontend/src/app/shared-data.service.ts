import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cashAvailableSource = new BehaviorSubject<number>(0);
  cashAvailable = this.cashAvailableSource.asObservable();

  private totalPortfolioValueSource = new BehaviorSubject<number>(0);
  totalPortfolioValue = this.totalPortfolioValueSource.asObservable();

  constructor() { }

  updateCashAvailable(data: number) {
    this.cashAvailableSource.next(data);
  }

  updatetotalPortfolioValue(data: number) {
    this.totalPortfolioValueSource.next(data)
  }
}
