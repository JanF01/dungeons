import { Item } from "../item.model";


export class Ring extends Item {

    stamina: number;
    critM: number;

    
    constructor(type,name,src,code,perks,cs,stamina,critM,public offset?: number,public clas?: string){
        super(type,name,src,code,perks,cs);

        this.stamina = stamina;
        this.critM = critM;
    }
}