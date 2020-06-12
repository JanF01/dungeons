export class Item {
  player_id: number;
  type: string;
  name: string;
  graphic: string;
  code: string;
  perks: string;
  cost: number;

  constructor(p_id, type, name, src, code, perks, cost) {
    this.player_id = p_id;
    this.type = type;
    this.name = name;
    this.graphic = src;
    this.code = code;
    this.perks = perks;
    this.cost = cost;
  }
}
