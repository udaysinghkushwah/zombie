import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'zombie-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  // add tailwind sizes where required
  @Input() size: 'xl' | '2xl' = '2xl';
  @Input() closeable = false;
  @Output() dismiss = new EventEmitter<MouseEvent>();

  onBackDropClick(event: MouseEvent) {
    this.dismiss.emit(event);
  }

  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
