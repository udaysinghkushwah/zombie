import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  const elements = {
    modalBackdrops: By.css('[data-testid=modal-backdrop]'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should properly render all child components', () => {
    it('modal-backdrop', () => {
      const modalBackdrop = fixture.debugElement.query(elements.modalBackdrops);
      expect(modalBackdrop).toBeTruthy();
    });
  });
});
