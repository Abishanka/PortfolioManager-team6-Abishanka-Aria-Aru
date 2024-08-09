import { Component } from '@angular/core';
import { PerformanceGraphComponent } from '../performance-graph/performance-graph.component';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';
import { MarketOverviewComponent } from '../market-overview/market-overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoldingsComponent } from '../holdings/holdings.component';
import { GloalSearchComponent } from '../gloal-search/gloal-search.component';
import { FundsComponent } from '../funds-management/funds.component';
import { SharedDataService } from '../shared-data.service';



@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PerformanceGraphComponent, InvestmentsComponent, NgbModule, MarketOverviewComponent, HoldingsComponent, GloalSearchComponent, FundsComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  cashAvailable: number = 0
  constructor(private modalService: NgbModal, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.sharedDataService.cashAvailable.subscribe(data => this.cashAvailable = Number(Number(data).toFixed(3)));
  }
  openFundsModal(): void {
    const modalRef = this.modalService.open(FundsComponent);
  }
}
