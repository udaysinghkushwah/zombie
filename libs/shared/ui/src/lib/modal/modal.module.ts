import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalBackdropModule } from './modal-backdrop/modal-backdrop.module';
import { ModalBodyModule } from './modal-body/modal-body.module';
import { ModalCloseButtonModule } from './modal-close-button/modal-close-button.module';
import { ModalFooterModule } from './modal-footer/modal-footer.module';
import { ModalHeaderModule } from './modal-header/modal-header.module';

@NgModule({
  imports: [
    CommonModule,
    ModalBackdropModule,
    ModalBodyModule,
    ModalCloseButtonModule,
    ModalFooterModule,
    ModalHeaderModule,
  ],
  declarations: [ModalComponent],
  exports: [
    ModalComponent,
    ModalBackdropModule,
    ModalBodyModule,
    ModalCloseButtonModule,
    ModalFooterModule,
    ModalHeaderModule,
  ],
})
export class ModalComponentModule {}
