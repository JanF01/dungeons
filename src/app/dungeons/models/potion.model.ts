
export class Potion {
   
    name: string;
    graphic: any;
    type: string;
    power: string;
    
    constructor(name,src,type,power){
          this.name = name;
          this.graphic = src;
          this.type = type;
          this.power = power;
    }


}