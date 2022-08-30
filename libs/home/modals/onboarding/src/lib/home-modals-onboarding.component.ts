import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'zombie-home-modals-onboarding',
  templateUrl: './home-modals-onboarding.component.html',
})
export class HomeModalsOnboardingComponent {
  @Output() dismiss = new EventEmitter<Date>();

  dismissModal() {
    this.dismiss.emit(new Date());
  }
}
