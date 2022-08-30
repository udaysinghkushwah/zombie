export type Token = Zombie | Creature;

export interface Zombie {
  id: number;
  type: 'ZOMBIE';
}

export interface Creature {
  id: number;
  type: 'CREATURE';
}
