import { Item } from "../item.model";


export class Crystal extends Item {

    amp: string;
    power: number;

    
    constructor(type,name,src,code,perks,cs,amp,power,public offset?: number,public clas?: string,public gem?: Crystal){
        super(type,name,src,code,perks,cs);
        
        this.amp = amp;
        this.power = power;
       
    }
}