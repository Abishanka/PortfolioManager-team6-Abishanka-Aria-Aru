import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceGraphComponent } from '../performance-graph/performance-graph.component';

@Component({
selector: 'ngbd-modal-content',
standalone: true,
imports:[PerformanceGraphComponent],
template: `
<div class="modal-header">
<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
</div>

<div class="container px-4 py-5">
  <h2 class="pb-2 border-bottom"> {{name}}</h2>
  <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
    <div class="col d-flex flex-column align-items-start gap-2">
      <app-performance-graph></app-performance-graph>
      <a href="#" class="btn btn-primary btn-lg">BUY</a>
      <a href="#" class="btn btn-primary btn-lg">SELL</a>
    </div>
    <div class="col d-flex flex-column align-items-start gap-2">
      <div class="table-responsive small">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Shares Owned</th>
              <th scope="col">Average Cost</th>
              <th scope="col">52 Week High</th>
              <th scope="col">Trailing P/E Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>10</td>
            <td>$100.21</td>
            <td>$142.74</td>
            <td>112.5</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-outline-secondary" (click)="activeModal.close('Close click')">Close</button>
  </div>
</div>
`,
})
export class NgbdModalContent {
activeModal = inject(NgbActiveModal);

@Input() name: string = '';}

@Component({
selector: 'ngbd-modal-component',
standalone: true,
templateUrl: './modal.component.html',
})
export class NgbdModalComponent {
  private modalService = inject(NgbModal);

  open() {
      const modalRef = this.modalService.open(NgbdModalContent, { size: 'lg' });
      modalRef.componentInstance.name = 'Tesla';
    }
}
