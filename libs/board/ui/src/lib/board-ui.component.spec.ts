import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BoardUiComponent } from './board-ui.component';
import {
  EMPTY_GRID_2x2,
  EMPTY_GRID_3X3,
} from '@zombie/board/interfaces';

describe('BoardUiComponent', () => {
  let component: BoardUiComponent;
  let fixture: ComponentFixture<BoardUiComponent>;

  const elements = {
    tiles: By.css('[data-testid=tile]'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardUiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render the correct number of tiles', () => {
    it('0x0 grid', () => {
      component.grid = [];
      fixture.detectChanges();

      const tiles = fixture.debugElement.queryAll(elements.tiles);
      expect(tiles.length).toBe(0);
    });

    it('2x2 grid', () => {
      component.grid = EMPTY_GRID_2x2;
      fixture.detectChanges();

      const tiles = fixture.debugElement.queryAll(elements.tiles);
      expect(tiles.length).toBe(4);
    });
  });

  describe('should emit the correct coordinates when clicked', () => {
    describe('3x3 grid', () => {
      beforeEach(() => {
        component.grid = EMPTY_GRID_3X3;
        fixture.detectChanges();
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      test.each([
        [0, { x: 0, y: 0 }],
        [1, { x: 1, y: 0 }],
        [2, { x: 2, y: 0 }],
        [3, { x: 0, y: 1 }],
        [4, { x: 1, y: 1 }],
        [5, { x: 2, y: 1 }],
        [6, { x: 0, y: 2 }],
        [7, { x: 1, y: 2 }],
        [8, { x: 2, y: 2 }],
      ])('tile number %i should emit %j', (tileNumber, expectedEmitted) => {
        const emitSpy = jest.spyOn(component.tileClicked, 'emit');
        const tiles = fixture.debugElement.queryAll(elements.tiles);
        (tiles[tileNumber].nativeElement as HTMLElement).dispatchEvent(
          new Event('click')
        );
        expect(emitSpy).toHaveBeenCalledWith(expectedEmitted);
      });
    });
  });
});
