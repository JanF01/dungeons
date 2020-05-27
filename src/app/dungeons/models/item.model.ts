
export class Item {
  
    type: string;
    name: string;
    graphic: string;
    code: string;
    perks: string;
    cost: number;

     constructor(type, name,src,code,perks,cost){
         
         this.type = type;
         this.name = name;
         this.graphic = src;
         this.code = code;
         this.perks = perks;
         this.cost = cost
     
     }



}