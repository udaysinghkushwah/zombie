import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModalsSettingsComponent } from './home-modals-settings.component';
import { MODE_CREATURE, MODE_ZOMBIE } from './settings-form';
import { BoardDataAccessService } from '@zombie/board/data-access';
import { Token } from '@zombie/board/interfaces';

describe('HomeModalsSettingsComponent', () => {
  let component: HomeModalsSettingsComponent;
  let fixture: ComponentFixture<HomeModalsSettingsComponent>;
  let service: BoardDataAccessService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [HomeModalsSettingsComponent],
      providers: [
        {
          provide: BoardDataAccessService,
          useValue: {} as Partial<BoardDataAccessService>,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModalsSettingsComponent);
    service = fixture.debugElement.injector.get(BoardDataAccessService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateGameBoard', () => {
    describe.each([
      [MODE_CREATURE, [], 'addCreatureToCell'] as UpdateScenarios,
      [
        MODE_CREATURE,
        [{ type: 'ZOMBIE' }],
        'addCreatureToCell',
      ] as UpdateScenarios,
      [
        MODE_CREATURE,
        [{ type: 'CREATURE' }],
        'removeCreaturesFromCell',
      ] as UpdateScenarios,
      [
        MODE_CREATURE,
        [{ type: 'ZOMBIE' }, { type: 'CREATURE' }],
        'removeCreaturesFromCell',
      ] as UpdateScenarios,
      [MODE_ZOMBIE, [], 'addZombieToCell'] as UpdateScenarios,
      [
        MODE_ZOMBIE,
        [{ type: 'ZOMBIE' }],
        'removeZombiesFromCell',
      ] as UpdateScenarios,
      [
        MODE_ZOMBIE,
        [{ type: 'CREATURE' }],
        'addZombieToCell',
      ] as UpdateScenarios,
      [
        MODE_ZOMBIE,
        [{ type: 'ZOMBIE' }, { type: 'CREATURE' }],
        'removeZombiesFromCell',
      ] as UpdateScenarios,
    ])('when mode is %i and tile is %j', (mode, tile, method) => {
      it(`calls ${method}`, () => {
        const coords = { x: 0, y: 0 };
        const updateSpy = jest.spyOn(service, method);
        const getTokensOnCoordinateSpy = jest
          .spyOn(service, 'getTokensOnCoordinate')
          .mockReturnValue(tile as Token[]);

        component.settingsForm.formControls.mode.setValue(mode);
        component.updateGameBoard(coords);
        fixture.detectChanges();

        expect(getTokensOnCoordinateSpy).toHaveBeenCalledWith(coords);
        expect(updateSpy).toHaveBeenCalled();
      });
    });
  });
});

type UpdateScenarios = [
  number,
  Token[],
  FunctionPropertyNames<BoardDataAccessService>
];

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
  string;
