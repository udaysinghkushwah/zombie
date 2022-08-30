import { Component, Input } from '@angular/core';

@Component({
  selector: 'zombie-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() color: 'none' | 'blue' | 'green' = 'none';
}
