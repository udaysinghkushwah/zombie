import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { isEqual } from 'lodash';
import {
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { MODE_CREATURE, MODE_ZOMBIE, SettingsForm } from './settings-form';
import { BoardDataAccessService } from '@zombie/board/data-access';
import {
  Board,
  BoardGrid,
  Coordinate,
  GRID_MAX,
  GRID_MIN,
  Token,
} from '@zombie/board/interfaces';

@Component({
  selector: 'zombie-home-modals-settings',
  templateUrl: './home-modals-settings.component.html',
  providers: [BoardDataAccessService],
})
export class HomeModalsSettingsComponent implements OnInit, OnDestroy {
  gridMin = GRID_MIN;
  gridMax = GRID_MAX;

  hasAttempedSubmission = false;

  settingsForm: SettingsForm = new SettingsForm();
  subscriptions: Subscription = new Subscription();
  grid$: Observable<BoardGrid> = this.board
    .fetchBoard()
    .pipe(map(({ grid }) => grid));

  @Input() closeable = false;
  @Output() settings = new EventEmitter<Board>();
  @Output() dismiss = new EventEmitter<MouseEvent>();

  constructor(private board: BoardDataAccessService) {
    this.subscriptions.add(this.bindSizeToSizeExtra());
    this.subscriptions.add(this.bindSizeExtraToSize());
    this.subscriptions.add(this.bindSizeToBoardGrid());
    this.subscriptions.add(this.bindMovesToBoardMoveset());
    this.subscriptions.add(this.bindBoardGridToZombies());
    this.subscriptions.add(this.bindBoardGridToCreatures());
  }

  ngOnInit(): void {
    this.settingsForm.formControls.size.setValue(
      this.settingsForm.formControls.size.value
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private bindSizeToSizeExtra() {
    const size = this.settingsForm.formControls.size;
    const sizeExtra = this.settingsForm.formControls.sizeExtra;
    const sizeChanges = size.valueChanges.pipe(distinctUntilChanged());

    return sizeChanges.subscribe((data) => sizeExtra.setValue(data));
  }

  private bindSizeExtraToSize() {
    const size = this.settingsForm.formControls.size;
    const sizeExtra = this.settingsForm.formControls.sizeExtra;
    const sizeExtraChanges = sizeExtra.valueChanges.pipe(
      distinctUntilChanged()
    );

    return sizeExtraChanges.subscribe((data) => size.setValue(data));
  }

  private bindSizeToBoardGrid() {
    const sizeChanges = this.settingsForm.formControls.size.valueChanges.pipe(
      distinctUntilChanged()
    );

    const boardChanges = this.board
      .fetchBoard()
      .pipe(distinctUntilChanged(isEqual));

    return combineLatest([sizeChanges, boardChanges]).subscribe(
      ([size, board]) => {
        const { grid } = board;
        const newGrid = [] as Token[][][];
        for (let y = 0; y < size; y++) {
          const row = [];
          for (let x = 0; x < size; x++) {
            row.push((grid[y] || [])[x] || []);
          }
          newGrid.push(row);
        }
        this.board.setBoard({ ...board, ...{ grid: newGrid } });
      }
    );
  }

  private bindMovesToBoardMoveset() {
    const moveChanges =
      this.settingsForm.formControls.moveSet.valueChanges.pipe(
        distinctUntilChanged()
      );

    const boardChanges = this.board
      .fetchBoard()
      .pipe(distinctUntilChanged(isEqual));

    return combineLatest([moveChanges, boardChanges]).subscribe(
      ([moveSet, board]) => {
        this.board.setBoard({ ...board, ...{ moveSet } });
      }
    );
  }

  private bindBoardGridToZombies() {
    const zombieCounter = this.settingsForm.formControls.zombies;
    const zombiesOnBoardChanges = this.board
      .fetchZombies()
      .pipe(distinctUntilChanged());

    return zombiesOnBoardChanges.subscribe((zombies) =>
      zombieCounter.setValue(zombies.length)
    );
  }

  private bindBoardGridToCreatures() {
    const creatureCounter = this.settingsForm.formControls.creatures;
    const creaturesOnBoardChanges = this.board
      .fetchCreatures()
      .pipe(distinctUntilChanged());

    return creaturesOnBoardChanges.subscribe((creatures) =>
      creatureCounter.setValue(creatures.length)
    );
  }

  onTileClick(coords: Coordinate) {
    this.updateGameBoard(coords);
  }

  updateGameBoard(coords: Coordinate) {
    const cell = this.board.getTokensOnCoordinate(coords);
    const mode = this.settingsForm.formControls.mode.value;

    const zombies = cell.filter((value) => value.type === 'ZOMBIE');
    const creatures = cell.filter((value) => value.type === 'CREATURE');

    switch (mode) {
      case MODE_ZOMBIE:
        zombies.length > 0
          ? this.board.removeZombiesFromCell(coords)
          : this.board.addZombieToCell(coords);
        break;

      case MODE_CREATURE:
        creatures.length > 0
          ? this.board.removeCreaturesFromCell(coords)
          : this.board.addCreatureToCell(coords);
        break;
    }
  }

  get errors() {
    return Object.keys(this.settingsForm.controls)
      .map((key) => ({ key, error: this.settingsForm.get(key)?.errors }))
      .filter(({ error }) => error);
  }

  get errorMessages() {
    return this.errors.map(({ key }) => {
      return {
        size: `Use the slider to select a size between ${this.gridMin} and ${this.gridMax}`,
        sizeExtra: `Use the slider to select a size between ${this.gridMin} and ${this.gridMax}`,
        zombies: `Click on the grid to place at least 1 zombie`,
        creatures: `Click on the grid to place creatures`,
        mode: `Select a token to place by clicking on the radio buttons`,
        moveSet: `Type a string of directions (U, D, L, R for Up, Down, Left and Right respectively) that zombies will follow`,
      }[key];
    });
  }

  submitButtonClick() {
    this.hasAttempedSubmission = true;

    if (this.errorMessages.length <= 0) {
      this.settings.emit(this.board.getBoard());
    }
  }

  onModalDismiss(event: MouseEvent) {
    if (!this.closeable) {
      return;
    }
    this.dismiss.emit(event);
  }
}
