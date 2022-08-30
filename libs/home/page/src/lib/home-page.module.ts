import { NgModule } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedNgCommonModule } from '@zombie/shared/ng/common';
import { HomeModalsOnboardingModule } from '@zombie/home/modals/onboarding';
import { HomeModalsSettingsModule } from '@zombie/home/modals/settings';
import { BoardUiModule } from '@zombie/board/ui';
import { ButtonComponentModule } from '@zombie/shared/ui';

@NgModule({
  imports: [
    SharedNgCommonModule,
    HomePageRoutingModule,
    HomeModalsOnboardingModule,
    HomeModalsSettingsModule,
    BoardUiModule,
    ButtonComponentModule,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
