import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const elements = {
    onboardingModal: By.css('[data-testid=onboarding-modal]'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('given the onboarding modal', () => {
    describe('when initially loaded', () => {
      it('should exist', () => {
        const onboardingModal = fixture.debugElement.query(
          elements.onboardingModal
        );
        expect(component.onboardingModalIsVisible).toBeTruthy();
        expect(onboardingModal).toBeTruthy();
      });
    });

    describe('when dismiss event is emitted', () => {
      beforeEach(() => {
        component.onOnboardingModalDismiss();
        fixture.detectChanges();
      });

      it('should not exist', () => {
        const onboardingModal = fixture.debugElement.query(
          elements.onboardingModal
        );
        expect(component.onboardingModalIsVisible).toBeFalsy();
        expect(onboardingModal).toBeFalsy();
      });
    });
  });
});
