import { Item } from "../item.model";


export class Necklace extends Item {

    stamina: number;
    critical: number;

    
    constructor(type,name,src,code,perks,cs,stamina,crit,public offset?: number,public clas?: string){
        super(type,name,src,code,perks,cs);

        this.stamina = stamina;
        this.critical = crit;
    }
}