import { Item } from "../item.model";
import { Crystal } from "./crystal.model";

export class Necklace extends Item {
  stamina: number;
  critical: number;

  constructor(
    p_id,
    type,
    name,
    src,
    code,
    perks,
    cs,
    stamina,
    crit,
    public offset?: number,
    public clas?: string,
    public gem?: Crystal
  ) {
    super(p_id, type, name, src, code, perks, cs);

    this.stamina = stamina;
    this.critical = crit;
  }
}
