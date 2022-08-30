import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBodyComponent } from './modal-body.component';

@NgModule({
  declarations: [ModalBodyComponent],
  exports: [ModalBodyComponent],
  imports: [CommonModule],
})
export class ModalBodyModule {}
