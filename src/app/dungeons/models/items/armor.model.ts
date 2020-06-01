import { Item } from "../item.model";
import { Crystal } from './crystal.model';

export class Armor extends Item {

    defence: number;
    chance: number;
    state: number;

    constructor(type,name,src,code,perks,cs,def,chance,status,public offset?: number, public clas?: string, public gem?: Crystal ){
          super(type,name,src,perks,code,cs);

          this.defence = def;
          this.chance = chance;
          this.state = status;
    }



}