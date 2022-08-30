import { Direction } from './direction.interface';
import { Token } from './token.interface';

export interface Board {
  grid: BoardGrid;
  moveSet: Direction[];
}

export type BoardGrid = Token[][][];

export interface Coordinate {
  x: number;
  y: number;
}

export const EMPTY_GRID_2x2: BoardGrid = [
  [[], []],
  [[], []],
];

export const EMPTY_GRID_3X3: BoardGrid = [
  [[], [], []],
  [[], [], []],
  [[], [], []],
];

export const DEFAULT_INIT_GRID: BoardGrid = EMPTY_GRID_2x2;

export const DEFAULT_INIT_BOARD: Board = {
  grid: DEFAULT_INIT_GRID,
  moveSet: [],
};

export const GRID_MIN = 2;

export const GRID_MAX = 20;

export const GRID_DEFAULT = [];

export const DEBOUNCE_TIME = 500;
