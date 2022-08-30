import { NgModule } from '@angular/core';
import { HomeModalsSettingsComponent } from './home-modals-settings.component';
import { SharedNgCommonModule } from '@zombie/shared/ng/common';
import {
  ButtonComponentModule,
  ModalComponentModule,
} from '@zombie/shared/ui';
import { BoardUiModule } from '@zombie/board/ui';

@NgModule({
  declarations: [HomeModalsSettingsComponent],
  exports: [HomeModalsSettingsComponent],
  imports: [
    SharedNgCommonModule,
    ModalComponentModule,
    ButtonComponentModule,
    BoardUiModule,
  ],
})
export class HomeModalsSettingsModule {}
