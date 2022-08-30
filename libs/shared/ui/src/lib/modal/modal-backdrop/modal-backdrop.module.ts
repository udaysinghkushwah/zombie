import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalBackdropComponent } from './modal-backdrop.component';

@NgModule({
  declarations: [ModalBackdropComponent],
  imports: [CommonModule],
  exports: [ModalBackdropComponent],
})
export class ModalBackdropModule {}
