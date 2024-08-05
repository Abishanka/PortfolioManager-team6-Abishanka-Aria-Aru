// modal.component.ts
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PerformanceGraphComponent } from '../performance-graph/performance-graph.component';


@Component({
selector: 'ngbd-modal1-content',
imports: [NgbDatepickerModule, NgbTimepickerModule, FormsModule, JsonPipe, PerformanceGraphComponent],
standalone: true,
templateUrl: './modal-first.html',
})

export class NgbdModal1Content {
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);

  openXl() {
      this.modalService.open(NgbdModal2Content, { size: 'xl' });
    }
  openLg() {
		this.modalService.open(NgbdModal2Content, { size: 'lg' });
	}
  numStocks = { hour: 13, minute: 30 };
  @Input() name: string = '';
}



@Component({
  standalone: true,
  imports: [NgbDatepickerModule, NgbTimepickerModule, FormsModule, JsonPipe, PerformanceGraphComponent, ],

  templateUrl: './modal-second.html',
})
export class NgbdModal2Content {
  activeModal = inject(NgbActiveModal);
}

@Component({
  selector: 'ngbd-modal-stacked',
  standalone: true,
  imports: [NgbDatepickerModule, NgbTimepickerModule, FormsModule, JsonPipe, PerformanceGraphComponent],
  templateUrl: './modal.component.html',
})
export class NgbdModalStacked {
  private modalService = inject(NgbModal);
  modalsNumber = 0;

  constructor() {
    this.modalService.activeInstances.pipe(takeUntilDestroyed()).subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }

  openXl() {
      this.modalService.open(NgbdModal1Content, { size: 'xl' });
    }
  openLg() {
		this.modalService.open(NgbdModal1Content, { size: 'lg' });
	}
}
