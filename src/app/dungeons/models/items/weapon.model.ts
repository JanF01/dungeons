import { Item } from "../item.model";

export class Weapon extends Item {
    
    damageLow: number;
    damageHigh: number;
    state: number;
    

    constructor(type,name,src,code,perks,dmgL,dmgH,state){
        super(type,name,src,code,perks);

        this.damageLow = dmgL;
        this.damageHigh = dmgH;
        this.state = state;
    }




}