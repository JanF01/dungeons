import { Item } from "../item.model";
import { Crystal } from "./crystal.model";

export class Weapon extends Item {
  damageLow: number;
  damageHigh: number;
  state: number;

  constructor(
    p_id,
    type,
    name,
    src,
    code,
    perks,
    cs,
    dmgL,
    dmgH,
    state,
    public offset?: number,
    public clas?: string,
    public gem?: Crystal
  ) {
    super(p_id, type, name, src, code, perks, cs);

    this.damageLow = dmgL;
    this.damageHigh = dmgH;
    this.state = state;
  }
}
