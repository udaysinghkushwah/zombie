import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BoardGrid,
  Coordinate,
  Token,
} from '@zombie/board/interfaces';

@Component({
  selector: 'zombie-board-ui',
  templateUrl: './board-ui.component.html',
})
export class BoardUiComponent {
  @Input() grid?: BoardGrid | null = [];
  @Output() tileClicked: EventEmitter<Coordinate> =
    new EventEmitter<Coordinate>();

  get gridTemplateColumns() {
    return `repeat(${(this.grid || []).length}, 1fr)`;
  }

  onTileClick(columnIndex: number, rowIndex: number): void {
    this.tileClicked.emit({
      x: columnIndex,
      y: rowIndex,
    });
  }

  onlyHasZombies(cell: Token[]) {
    return (
      cell.length > 0 &&
      cell.length === cell.filter(({ type }) => type === 'ZOMBIE').length
    );
  }

  onlyHasCreatures(cell: Token[]) {
    return (
      cell.length > 0 &&
      cell.length === cell.filter(({ type }) => type === 'CREATURE').length
    );
  }

  hasCreaturesAndZombies(cell: Token[]) {
    return (
      cell.some(({ type }) => type === 'ZOMBIE') &&
      cell.some(({ type }) => type === 'CREATURE')
    );
  }
}
