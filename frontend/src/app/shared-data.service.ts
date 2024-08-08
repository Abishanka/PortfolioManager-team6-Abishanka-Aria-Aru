import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cashAvailableSource = new BehaviorSubject<number>(0);
  cashAvailable = this.cashAvailableSource.asObservable();

  constructor() { }

  updateCashAvailable(data: number) {
    this.cashAvailableSource.next(data);
  }
}
