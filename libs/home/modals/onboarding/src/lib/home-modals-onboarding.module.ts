import { NgModule } from '@angular/core';
import { HomeModalsOnboardingComponent } from './home-modals-onboarding.component';
import { SharedNgCommonModule } from '@zombie/shared/ng/common';
import {
  ButtonComponentModule,
  ModalComponentModule,
} from '@zombie/shared/ui';

@NgModule({
  imports: [SharedNgCommonModule, ButtonComponentModule, ModalComponentModule],
  declarations: [HomeModalsOnboardingComponent],
  exports: [HomeModalsOnboardingComponent],
})
export class HomeModalsOnboardingModule {}
