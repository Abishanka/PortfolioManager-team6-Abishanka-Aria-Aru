import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceGraphComponent } from '../performance-graph/performance-graph.component';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';
import { MarketOverviewComponent } from '../market-overview/market-overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoldingsComponent } from '../holdings/holdings.component';
import { GloalSearchComponent } from '../gloal-search/gloal-search.component';
import { FundsComponent } from '../funds-management/funds.component';
import { SharedDataService } from '../shared-data.service';
import { PageService } from '../page.service';



@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PerformanceGraphComponent, InvestmentsComponent, NgbModule, MarketOverviewComponent, HoldingsComponent, GloalSearchComponent, FundsComponent, CommonModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  cashAvailable: number = 0;
  totalPortfolioValue: number = 0;
  netCashDeposits: number = 0;
  private intervalId: any;
  constructor(private modalService: NgbModal, private sharedDataService: SharedDataService, private pageService: PageService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.sharedDataService.cashAvailable.subscribe(data => this.cashAvailable = Number(Number(data).toFixed(3)));
    this.sharedDataService.totalPortfolioValue.subscribe(data => this.totalPortfolioValue = Number(Number(data).toFixed(3)));
    this.pageService.getNetCashDeposits().subscribe(data => this.netCashDeposits = Number(Number(data.net_cash_deposits).toFixed(3)));
  }
  openFundsModal(): void {
    const modalRef = this.modalService.open(FundsComponent);
  }
  getPnL(): number {
    return this.totalPortfolioValue - this.netCashDeposits;
  }
}
