export class Mission {
  description: string;
  name: string;
  additions: string;
  time: number;
  exp: number;
  loot: Array<any>;
  type: number;
  partaken: boolean;
  finished: boolean;

  constructor(
    desc,
    name,
    add,
    t,
    exp,
    loot,
    type,
    taken,
    end,
    public sum?: number,
    public done?: number
  ) {
    this.description = desc;
    this.name = name;
    this.additions = add;
    this.time = t;
    this.exp = exp;
    this.loot = loot;
    this.type = type;
    this.finished = end;
    this.partaken = taken;
  }
}
