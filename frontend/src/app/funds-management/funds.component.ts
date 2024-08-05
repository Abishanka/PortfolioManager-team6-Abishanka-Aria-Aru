import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InvestmentsComponent } from '../investment-graph/investment-graph.component';

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [FormsModule, JsonPipe, InvestmentsComponent],
  templateUrl: './funds-modal.html',
  styleUrl: './funds.component.css'
})
export class NgbdFunds1Content {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  openXl() {
      this.modalService.open(NgbdFunds2Content, { size: 'xl' });
    }
  openLg() {
		this.modalService.open(NgbdFunds2Content, { size: 'lg' });
	}
  @Input() name: string = '';
}

@Component({
  standalone: true,
  imports: [FormsModule, JsonPipe, InvestmentsComponent],
  templateUrl: './funds-transaction-approval.html',
})

export class NgbdFunds2Content {
  activeModal = inject(NgbActiveModal);
}

@Component({
  selector: 'app-funds',
  standalone: true,
  imports: [FormsModule, JsonPipe, InvestmentsComponent],
  templateUrl: './funds.component.html',
})
export class FundsComponent {
  private modalService = inject(NgbModal);
  modalsNumber = 0;

  constructor() {
    this.modalService.activeInstances.pipe(takeUntilDestroyed()).subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  openXl() {
      this.modalService.open(NgbdFunds1Content, { size: 'xl' });
    }
  openLg() {
		this.modalService.open(NgbdFunds1Content, { size: 'lg' });
	}
}




