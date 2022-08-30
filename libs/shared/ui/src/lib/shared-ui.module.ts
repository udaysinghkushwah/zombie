import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule } from './button/button.module';

@NgModule({
  imports: [CommonModule, ButtonComponentModule],
  exports: [ButtonComponentModule],
})
export class SharedUiModule {}
