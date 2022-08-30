import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import {
  Board,
  BoardGrid,
  Coordinate,
  DEFAULT_INIT_BOARD,
  Token,
} from '@zombie/board/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoardDataAccessService {
  private board: BehaviorSubject<Board>;
  private board$: Observable<Board>;
  newZombieId = 0;
  newCreatureId = 0;

  constructor() {
    this.board = new BehaviorSubject<Board>(DEFAULT_INIT_BOARD);
    this.board$ = this.board.asObservable();
  }

  fetchBoard(): Observable<Board> {
    return this.board$;
  }

  getBoard(): Board {
    return this.board.value;
  }

  setBoard(newBoard: Board): void {
    this.board.next(newBoard);
  }

  fetchZombies() {
    return this.fetchTokensOfType('ZOMBIE');
  }

  fetchCreatures() {
    return this.fetchTokensOfType('CREATURE');
  }

  fetchTokensOfType(tokenType: 'ZOMBIE' | 'CREATURE') {
    return this.fetchBoard().pipe(
      distinctUntilChanged(),
      map(({ grid }) =>
        grid.reduce(
          (allZombies, row) => [
            ...allZombies,
            ...row.reduce(
              (zombiesOnRow, cell) => [
                ...zombiesOnRow,
                ...cell.filter(({ type }) => type === tokenType),
              ],
              []
            ),
          ],
          [] as Token[]
        )
      )
    );
  }

  getZombies() {
    return this.getTokensOfType('ZOMBIE');
  }

  getCreatures() {
    return this.getTokensOfType('CREATURE');
  }

  getTokensOfType(tokenType: 'ZOMBIE' | 'CREATURE') {
    const { grid } = this.getBoard();
    return grid.reduce(
      (allZombies, row) => [
        ...allZombies,
        ...row.reduce(
          (zombiesOnRow, cell) => [
            ...zombiesOnRow,
            ...cell.filter(({ type }) => type === tokenType),
          ],
          []
        ),
      ],
      [] as Token[]
    );
  }

  getCreaturesOnCoordinate(coords: Coordinate) {
    return this.getTokensOnCoordinate(coords).filter(
      ({ type }) => type === 'CREATURE'
    );
  }

  getZombiesOnCoordinate(coords: Coordinate) {
    return this.getTokensOnCoordinate(coords).filter(
      ({ type }) => type === 'ZOMBIE'
    );
  }

  getTokensOnCoordinate(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    return grid[y][x];
  }

  addZombieToCell(coords: Coordinate, zombieId: number = this.newZombieId++) {
    this.addTokenToCell(coords, { type: 'ZOMBIE', id: zombieId });
  }

  addCreatureToCell(
    coords: Coordinate,
    creatureId: number = this.newCreatureId++
  ) {
    this.addTokenToCell(coords, { type: 'CREATURE', id: creatureId });
  }

  addTokenToCell(coords: Coordinate, token: Token) {
    const board = this.getBoard();
    const { grid } = JSON.parse(JSON.stringify(board));
    const { x, y } = coords;

    grid[y][x].push(token);
    this.setBoard({ ...board, grid });
  }

  removeZombiesFromCell(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    grid[y][x] = grid[y][x].filter((token) => token.type !== 'ZOMBIE');
    this.setBoard({ ...board, grid });
  }

  removeCreaturesFromCell(coords: Coordinate) {
    const board = this.getBoard();
    const { grid } = board;
    const { x, y } = coords;

    grid[y][x] = grid[y][x].filter((token) => token.type !== 'CREATURE');
    this.setBoard({ ...board, grid });
  }

  removeCreature(creatureId: number) {
    const board = this.getBoard();
    const { grid } = board;
    const newGrid: BoardGrid = grid.reduce(
      (newGrid, row) => [
        ...newGrid,
        ...[
          row.reduce(
            (newRow, cell) => [
              ...newRow,
              ...[
                cell.filter(
                  (token) =>
                    !(token.type === 'CREATURE' && token.id === creatureId)
                ),
              ],
            ],
            [] as Token[][]
          ),
        ],
      ],
      [] as Token[][][]
    );

    this.setBoard({ ...board, ...{ grid: newGrid } });
  }

  removeZombie(zombieId: number) {
    const board = this.getBoard();
    const { grid } = board;
    const newGrid: BoardGrid = grid.reduce(
      (newGrid, row) => [
        ...newGrid,
        ...[
          row.reduce(
            (newRow, cell) => [
              ...newRow,
              ...[
                cell.filter(
                  (token) => !(token.type === 'ZOMBIE' && token.id === zombieId)
                ),
              ],
            ],
            [] as Token[][]
          ),
        ],
      ],
      [] as Token[][][]
    );

    this.setBoard({ ...board, ...{ grid: newGrid } });
  }

  getCoordsWithTokenAndId(type: 'ZOMBIE' | 'CREATURE', id: number) {
    const { grid } = this.getBoard();
    const returnable = [] as Coordinate[];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        for (let i = 0; i < grid[y][x].length; i++) {
          const token = grid[y][x][i];
          if (token.id === id && token.type === type) {
            returnable.push({ y, x });
          }
        }
      }
    }

    return returnable;
  }
}
