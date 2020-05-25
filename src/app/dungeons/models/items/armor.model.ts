import { Item } from "../item.model";

export class Armor extends Item {

    defence: number;
    chance: number;
    state: number;

    constructor(type,name,src,code,perks,def,chance,status){
          super(type,name,src,perks,code);

          this.defence = def;
          this.chance = chance;
          this.state = status;
    }



}