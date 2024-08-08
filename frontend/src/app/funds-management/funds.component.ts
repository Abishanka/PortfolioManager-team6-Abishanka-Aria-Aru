import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';
import { FundsModalService } from '../funds-modal.service';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [FormsModule, JsonPipe, InvestmentsComponent],
  templateUrl: './funds.component.html',
  styleUrl: './funds.component.css'
})
export class FundsComponent {
  amount: number = 0;

  constructor(private fundsService: FundsModalService, public activeModal: NgbActiveModal) {  }

  depositCash(amount: number): void {
    this.fundsService.depositCash(amount).subscribe(response => {
      console.log(response);
    });
  }
  withdrawCash(amount: number): void {
    this.fundsService.withdrawCash(amount).subscribe(response => {
      console.log(response);
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }
}




