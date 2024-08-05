import { Component } from '@angular/core';
import { PerformanceGraphComponent } from '../performance-graph/performance-graph.component';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';
import { MarketOverviewComponent } from '../market-overview/market-overview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HoldingsComponent } from '../holdings/holdings.component';
import { GloalSearchComponent } from '../gloal-search/gloal-search.component';
import { NgbdModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PerformanceGraphComponent, InvestmentsComponent, NgbModule, MarketOverviewComponent, HoldingsComponent, GloalSearchComponent ,NgbdModalComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }


}
