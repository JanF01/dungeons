import { Item } from "../item.model";

export class Weapon extends Item {
    
    damageLow: number;
    damageHigh: number;
    state: number;
    

    constructor(type,name,src,code,perks,cs,dmgL,dmgH,state,public offset?: number,public clas?: string){
        super(type,name,src,code,perks,cs);

        this.damageLow = dmgL;
        this.damageHigh = dmgH;
        this.state = state;
    }




}