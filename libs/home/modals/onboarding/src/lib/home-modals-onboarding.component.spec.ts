import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeModalsOnboardingComponent } from './home-modals-onboarding.component';

describe('HomeModalsOnboardingComponent', () => {
  let component: HomeModalsOnboardingComponent;
  let fixture: ComponentFixture<HomeModalsOnboardingComponent>;

  const elements = {
    backstoryContent: By.css(`[data-testid=backstory-content]`),
    beginButton: By.css(`[data-testid=begin-button]`),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeModalsOnboardingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should properly render all child components', () => {
    it('backstory content', () => {
      const beginButton = fixture.debugElement.query(elements.backstoryContent);
      expect(beginButton).toBeTruthy();
    });

    it('begin button', () => {
      const beginButton = fixture.debugElement.query(elements.beginButton);
      expect(beginButton).toBeTruthy();
    });
  });

  it('should emit when begin button is clicked', () => {
    const dismissEventEmitter = jest.spyOn(component.dismiss, 'emit');
    const beginButton = fixture.debugElement.query(elements.beginButton);

    (beginButton.nativeElement as HTMLButtonElement).dispatchEvent(
      new Event('click')
    );
    fixture.detectChanges();

    expect(dismissEventEmitter).toHaveBeenCalled();
  });
});
