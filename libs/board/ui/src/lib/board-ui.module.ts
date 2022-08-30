import { EventEmitter, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardUiComponent } from './board-ui.component';

/**
 * Renders a 2D array of buttons
 */
@NgModule({
  declarations: [BoardUiComponent],
  exports: [BoardUiComponent],
  imports: [CommonModule],
})
export class BoardUiModule {
  @Input() height = 0;
  @Input() width = 0;
  @Output() tileClick = new EventEmitter();
}
