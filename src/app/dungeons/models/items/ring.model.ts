import { Item } from "../item.model";
import { Crystal } from "./crystal.model";

export class Ring extends Item {
  stamina: number;
  critM: number;

  constructor(
    p_id,
    type,
    name,
    src,
    code,
    perks,
    cs,
    stamina,
    critM,
    public offset?: number,
    public clas?: string,
    public gem?: Crystal
  ) {
    super(p_id, type, name, src, code, perks, cs);

    this.stamina = stamina;
    this.critM = critM;
  }
}
