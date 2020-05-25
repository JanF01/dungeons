
export class Item {
  
    type: string;
    name: string;
    graphic: string;
    code: string;
    perks: string;

     constructor(type, name,src,code,perks){
         
         this.type = type;
         this.name = name;
         this.graphic = src;
         this.code = code;
         this.perks = perks;
     
     }



}