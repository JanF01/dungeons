import { Enemy } from "./enemy.model";

export class Dungeon {
  label: string;
  img: string;
  monsters: Array<Enemy>;
  completed: number = 0;
  open: boolean;
  amount: number;

  constructor(label, src, enemys, comp = 0, open = false, sum) {
    this.label = label;
    this.img = src;
    this.monsters = enemys;
    this.completed = comp;
    this.open = open;
    this.amount = sum;
  }
}
