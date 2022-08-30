import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCloseButtonComponent } from './modal-close-button.component';

describe('ModalCloseButtonComponent', () => {
  let component: ModalCloseButtonComponent;
  let fixture: ComponentFixture<ModalCloseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCloseButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCloseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
