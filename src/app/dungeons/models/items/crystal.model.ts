import { Item } from "../item.model";

export class Crystal extends Item {
  amp: string;
  power: number;

  constructor(
    p_id,
    type,
    name,
    src,
    code,
    perks,
    cs,
    amp,
    power,
    public offset?: number,
    public clas?: string
  ) {
    super(p_id, type, name, src, code, perks, cs);

    this.amp = amp;
    this.power = power;
  }
}
