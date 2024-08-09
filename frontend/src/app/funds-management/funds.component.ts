import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';
import { FundsModalService } from '../funds-modal.service';
import { SharedDataService } from '../shared-data.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [FormsModule, JsonPipe, InvestmentsComponent],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})
export class FundsComponent {
  amount: number = 0;
  cashAvailable: number = 0
  constructor(private fundsService: FundsModalService, public activeModal: NgbActiveModal, private sharedDataService: SharedDataService) {  }

  ngOnInit() {
    this.sharedDataService.cashAvailable.subscribe(data => this.cashAvailable = Number(Number(data).toFixed(3)));
  }
  depositCash(amount: number): void {
    this.fundsService.depositCash(amount).subscribe(response => {
      console.log(response);
      if (response.status == 'success') {
        alert(`Deposited $ ${response.last_transaction[2]} to account`)
      }
      else {
        alert('Failed to deposit cash')
      }
      window.location.reload()
    });
  }
  withdrawCash(amount: number): void {
    if (amount >this.cashAvailable) {
      alert('Cannot withdraw more cash than owned.');
      return;
    }
    this.fundsService.withdrawCash(amount).subscribe(response => {
      console.log(response);
      if (response.status == 'success') {
        alert(`Withdrawn $ ${response.last_transaction[2]} from account`)
      }
      else {
        alert('Failed to withdraw cash')
      }
      window.location.reload()
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }
}