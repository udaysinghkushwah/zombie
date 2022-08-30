import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFooterComponent } from './modal-footer.component';

@NgModule({
  declarations: [ModalFooterComponent],
  exports: [ModalFooterComponent],
  imports: [CommonModule],
})
export class ModalFooterModule {}
