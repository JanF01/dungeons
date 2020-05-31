
export class Potion {
   
    name: string;
    graphic: any;
    type: string;
    refill: string;
    label: string;
    
    constructor(name,src,type,refill,label){
          this.name = name;
          this.graphic = src;
          this.type = type;
          this.refill = refill;
          this.label = label;
    }


}